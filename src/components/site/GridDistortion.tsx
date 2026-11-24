import { useEffect, useRef, useState, type CSSProperties } from "react";

const VERTEX = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uImage;
uniform sampler2D uField;
uniform vec2 uGrid;
uniform vec2 uCover;
uniform float uSoftness;
uniform float uChroma;
uniform float uReveal;
in vec2 vUv;
out vec4 outColor;

vec2 fieldAt(ivec2 cell) {
  return texelFetch(uField, clamp(cell, ivec2(0), ivec2(uGrid) - 1), 0).rg;
}

vec3 sampleImage(vec2 uv) {
  return texture(uImage, (uv - 0.5) * uCover + 0.5).rgb;
}

void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 g = uv * uGrid;
  vec2 blocky = fieldAt(ivec2(floor(g)));
  vec2 p = g - 0.5;
  ivec2 base = ivec2(floor(p));
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  vec2 soft = mix(
    mix(fieldAt(base), fieldAt(base + ivec2(1, 0)), f.x),
    mix(fieldAt(base + ivec2(0, 1)), fieldAt(base + ivec2(1, 1)), f.x),
    f.y
  );
  vec2 shift = mix(blocky, soft, uSoftness);
  float spread = uChroma * 0.35;
  vec3 color = vec3(
    sampleImage(uv - shift * (1.0 + spread)).r,
    sampleImage(uv - shift).g,
    sampleImage(uv - shift * (1.0 - spread)).b
  );
  outColor = vec4(color * uReveal, uReveal);
}`;

const GAIN = 18;
const RIPPLE_LIFE = 1.6;

export type GridDistortionMode = "drag" | "push" | "swirl";

export interface GridDistortionProps {
  /** Still image source or poster fallback before video frames arrive */
  imageSrc?: string;
  /** Looping video source to distort in real time via WebGL2 */
  videoSrc?: string;
  grid?: number;
  radius?: number;
  strength?: number;
  relaxation?: number;
  mode?: GridDistortionMode;
  softness?: number;
  chroma?: number;
  idle?: number;
  clickRipple?: boolean;
  intro?: boolean;
  className?: string;
  style?: CSSProperties;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const hash = (x: number, y: number, z: number) => {
  let h = Math.imul(x, 0x27d4eb2d) ^ Math.imul(y, 0x165667b1) ^ Math.imul(z, 0x2c1b3c6d);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 2147483648 - 1;
};

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
};

interface NormalizedSettings {
  grid: number;
  radius: number;
  strength: number;
  relaxation: number;
  mode: GridDistortionMode;
  softness: number;
  chroma: number;
  idle: number;
  clickRipple: boolean;
  intro: boolean;
}

interface Ripple {
  x: number;
  y: number;
  start: number;
}

export function GridDistortion({
  imageSrc,
  videoSrc,
  grid = 15,
  radius = 0.18,
  strength = 0.15,
  relaxation = 0.96,
  mode = "drag",
  softness = 0,
  chroma = 0,
  idle = 0.3,
  clickRipple = true,
  intro = true,
  className = "",
  style,
}: GridDistortionProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglUnsupported, setWebglUnsupported] = useState(false);

  const settings: NormalizedSettings = {
    grid: clamp(Math.round(grid), 2, 120),
    radius: clamp(radius, 0.01, 1),
    strength: Math.max(0, strength),
    relaxation: clamp(relaxation, 0, 0.995),
    mode,
    softness: clamp(softness, 0, 1),
    chroma: clamp(chroma, 0, 2),
    idle: clamp(idle, 0, 1),
    clickRipple,
    intro,
  };

  const settingsRef = useRef<NormalizedSettings>(settings);
  settingsRef.current = settings;

  const controlRef = useRef<{
    loadMedia: (img?: string, vid?: string) => void;
    wake: () => void;
  } | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });

    if (!root || !canvas || !gl) {
      setWebglUnsupported(true);
      return undefined;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      setWebglUnsupported(true);
      return undefined;
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglUnsupported(true);
      return undefined;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uImage = gl.getUniformLocation(program, "uImage");
    const uField = gl.getUniformLocation(program, "uField");
    const uGrid = gl.getUniformLocation(program, "uGrid");
    const uCover = gl.getUniformLocation(program, "uCover");
    const uSoftness = gl.getUniformLocation(program, "uSoftness");
    const uChroma = gl.getUniformLocation(program, "uChroma");
    const uReveal = gl.getUniformLocation(program, "uReveal");

    gl.uniform1i(uImage, 0);
    gl.uniform1i(uField, 1);

    const imageTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0]),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const fieldTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const pointer = { x: 0, y: 0, px: 0, py: 0, inside: false };
    const state = {
      width: 1,
      height: 1,
      cols: 0,
      rows: 0,
      sim: new Float32Array(0),
      out: new Float32Array(0),
      ripples: [] as Ripple[],
      time: 0,
      reveal: 0,
      loaded: false,
      imageAspect: 1,
      request: 0,
      lastMove: -10,
      phantom: 1,
    };

    let videoEl: HTMLVideoElement | null = null;
    let videoReady = false;
    let raf = 0;
    let last = 0;
    let visible = true;
    let alive = true;

    const layout = () => {
      const cols = settingsRef.current.grid;
      const rows = Math.max(1, Math.round((cols * state.height) / state.width));
      if (cols === state.cols && rows === state.rows) return;
      state.cols = cols;
      state.rows = rows;
      state.sim = new Float32Array(cols * rows * 2);
      state.out = new Float32Array(cols * rows * 2);
      gl.activeTexture(gl.TEXTURE1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, cols, rows, 0, gl.RG, gl.FLOAT, state.out);
    };

    const scramble = () => {
      const { sim, cols, rows, width, height } = state;
      const reach = Math.min(width, height) * 0.12;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = (row * cols + col) * 2;
          sim[i] = (hash(col + 1, row + 1, 11) * reach) / width;
          sim[i + 1] = (hash(col + 1, row + 1, 23) * reach) / height;
        }
      }
    };

    const brush = (
      s: NormalizedSettings,
      x: number,
      y: number,
      dx: number,
      dy: number,
      weight: number,
    ) => {
      const { sim, cols, rows, width, height } = state;
      const reach = Math.max(1, s.radius * width);
      const cellWidth = width / cols;
      const cellHeight = height / rows;
      const speed = Math.hypot(dx, dy);
      const limit = (0.25 + s.strength) * 0.4 * width;
      const fromCol = Math.max(0, Math.floor((x - reach) / cellWidth));
      const toCol = Math.min(cols - 1, Math.floor((x + reach) / cellWidth));
      const fromRow = Math.max(0, Math.floor((y - reach) / cellHeight));
      const toRow = Math.min(rows - 1, Math.floor((y + reach) / cellHeight));
      for (let row = fromRow; row <= toRow; row++) {
        for (let col = fromCol; col <= toCol; col++) {
          const ox = (col + 0.5) * cellWidth - x;
          const oy = (row + 0.5) * cellHeight - y;
          const distance = Math.hypot(ox, oy);
          if (distance >= reach) continue;
          const t = 1 - (distance / reach) ** 2;
          const k = s.strength * GAIN * weight * t * t;
          let vx = dx;
          let vy = dy;
          if (s.mode !== "drag") {
            const nx = distance > 0 ? ox / distance : 0;
            const ny = distance > 0 ? oy / distance : 0;
            vx = s.mode === "push" ? nx * speed : -ny * speed;
            vy = s.mode === "push" ? ny * speed : nx * speed;
          }
          const i = (row * cols + col) * 2;
          const curX = sim[i] ?? 0;
          const curY = sim[i + 1] ?? 0;
          const px = curX * width + vx * k;
          const py = curY * height + vy * k;
          const length = Math.hypot(px, py);
          const scale = length > 0 ? (limit * Math.tanh(length / limit)) / length : 0;
          sim[i] = (px * scale) / width;
          sim[i + 1] = (py * scale) / height;
        }
      }
    };

    const wander = (t: number): [number, number] => [
      state.width * (0.5 + 0.34 * Math.sin(t * 0.43) + 0.08 * Math.sin(t * 1.21 + 1.7)),
      state.height * (0.5 + 0.3 * Math.sin(t * 0.61 + 0.9) + 0.08 * Math.cos(t * 1.03 + 0.4)),
    ];

    const simulate = (s: NormalizedSettings, dt: number) => {
      const { sim } = state;
      const decay = Math.pow(s.relaxation, dt * 60);
      let peak = 0;
      for (let i = 0; i < sim.length; i++) {
        const nextVal = (sim[i] ?? 0) * decay;
        if (Math.abs(nextVal) < 1e-5) {
          sim[i] = 0;
        } else {
          sim[i] = nextVal;
          peak = Math.max(peak, Math.abs(nextVal));
        }
      }
      if (s.strength <= 0) return peak;

      const dx = pointer.x - pointer.px;
      const dy = pointer.y - pointer.py;
      pointer.px = pointer.x;
      pointer.py = pointer.y;
      if (pointer.inside && (dx || dy)) {
        state.lastMove = state.time;
        brush(s, pointer.x, pointer.y, dx, dy, 1);
        peak = Math.max(peak, 1e-3);
      }

      const drift = reduce ? 0 : s.idle;
      const resting = state.time - state.lastMove > 2.5;
      state.phantom = clamp(state.phantom + (resting ? dt : -dt * 3), 0, 1);
      if (drift > 0 && state.phantom > 0) {
        const [x, y] = wander(state.time);
        const [px, py] = wander(state.time - dt);
        brush(s, x, y, x - px, y - py, drift * 0.6 * state.phantom * state.phantom);
      }
      return peak;
    };

    const compose = (s: NormalizedSettings) => {
      const { sim, out, cols, rows, width, height, time } = state;
      out.set(sim);
      if (state.ripples.length) {
        const cellWidth = width / cols;
        const cellHeight = height / rows;
        const span = Math.hypot(width, height);
        const band = Math.max(cellWidth, cellHeight) * 1.2 + span * 0.03;
        const amount = width * (0.03 + s.strength * 0.3);
        state.ripples = state.ripples.filter((ripple) => time - ripple.start < RIPPLE_LIFE);
        for (const ripple of state.ripples) {
          const age = (time - ripple.start) / RIPPLE_LIFE;
          const front = age * span * 0.75;
          const fade = (1 - age) ** 2;
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const ox = (col + 0.5) * cellWidth - ripple.x;
              const oy = (row + 0.5) * cellHeight - ripple.y;
              const distance = Math.hypot(ox, oy);
              const wave = Math.exp(-(((distance - front) / band) ** 2)) * fade;
              if (wave < 0.002 || distance === 0) continue;
              const i = (row * cols + col) * 2;
              out[i] = (out[i] ?? 0) + (ox / distance) * ((wave * amount) / width);
              out[i + 1] = (out[i + 1] ?? 0) + (oy / distance) * ((wave * amount) / height);
            }
          }
        }
      }
    };

    const render = () => {
      const { width, height } = state;
      const aspect = width / height;
      const cover =
        aspect > state.imageAspect
          ? [1, state.imageAspect / aspect]
          : [aspect / state.imageAspect, 1];

      if (videoEl && videoReady && videoEl.readyState >= 2) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, imageTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, videoEl);
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.activeTexture(gl.TEXTURE1);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, state.cols, state.rows, gl.RG, gl.FLOAT, state.out);
      const s = settingsRef.current;
      gl.uniform2f(uGrid, state.cols, state.rows);
      gl.uniform2f(uCover, cover[0] ?? 1, cover[1] ?? 1);
      gl.uniform1f(uSoftness, s.softness);
      gl.uniform1f(uChroma, s.chroma);
      gl.uniform1f(uReveal, state.reveal);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!alive || !visible) return;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      state.time += dt;
      layout();
      if (state.loaded) state.reveal = reduce ? 1 : Math.min(1, state.reveal + dt / 0.6);
      const peak = simulate(s, dt);
      compose(s);
      render();
      const videoPlaying = Boolean(videoEl && videoReady && !videoEl.paused && !videoEl.ended);
      const busy =
        videoPlaying ||
        peak > 0 ||
        state.ripples.length > 0 ||
        (s.idle > 0 && !reduce) ||
        state.reveal < 1;
      if (busy) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (raf || !alive || !visible) return;
      raf = requestAnimationFrame(frame);
    };

    const cleanupVideo = () => {
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
        videoEl = null;
      }
      videoReady = false;
    };

    const loadMedia = (imgSrc?: string, vidSrc?: string) => {
      const request = ++state.request;
      cleanupVideo();

      if (imgSrc) {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.decoding = "async";
        image.onload = () => {
          if (!alive || request !== state.request) return;
          if (!videoReady) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, imageTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            state.imageAspect = image.naturalWidth / Math.max(1, image.naturalHeight);
            layout();
            if (settingsRef.current.intro && !reduce && !state.loaded) scramble();
            state.loaded = true;
            wake();
          }
        };
        image.src = imgSrc;
      }

      if (vidSrc) {
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = true;
        video.preload = "auto";

        const onCanPlay = () => {
          if (!alive || request !== state.request) return;
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            state.imageAspect = video.videoWidth / video.videoHeight;
          }
          videoReady = true;
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, imageTexture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          layout();
          if (settingsRef.current.intro && !reduce && !state.loaded) scramble();
          state.loaded = true;
          video.play().catch(() => {});
          wake();
        };

        video.addEventListener("loadeddata", onCanPlay);
        video.addEventListener("canplay", onCanPlay);
        video.src = vidSrc;
        video.load();
        videoEl = video;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (inside && !pointer.inside) {
        pointer.px = x;
        pointer.py = y;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.inside = inside;
      if (inside) wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!settingsRef.current.clickRipple || reduce) return;
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      state.ripples.push({ x, y, start: state.time });
      if (state.ripples.length > 4) state.ripples.shift();
      wake();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = Math.max(1, root.clientWidth);
      state.height = Math.max(1, root.clientHeight);
      canvas.width = Math.round(state.width * dpr);
      canvas.height = Math.round(state.height * dpr);
      layout();
      compose(settingsRef.current);
      render();
      wake();
    };

    controlRef.current = { loadMedia, wake };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    const visibility = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) {
        last = 0;
        if (videoEl && videoReady && videoEl.paused) {
          videoEl.play().catch(() => {});
        }
        wake();
      }
    });
    visibility.observe(root);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    resize();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      controlRef.current = null;
      cleanupVideo();
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      gl.deleteTexture(imageTexture);
      gl.deleteTexture(fieldTexture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  useEffect(() => {
    controlRef.current?.loadMedia(imageSrc, videoSrc);
  }, [imageSrc, videoSrc]);

  useEffect(() => {
    controlRef.current?.wake();
  });

  return (
    <div
      ref={rootRef}
      className={`relative h-full w-full min-h-0 min-w-0 overflow-hidden${className ? ` ${className}` : ""}`}
      style={style}
    >
      {webglUnsupported && videoSrc ? (
        <video
          className="h-full w-full object-cover"
          src={videoSrc}
          poster={imageSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 block h-full w-full"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default GridDistortion;
