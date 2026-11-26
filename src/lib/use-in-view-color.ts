import { useEffect, useRef, useState } from "react";

/**
 * On touch/coarse-pointer devices where hover isn't available, tracks when
 * an element scrolls into the central viewing band so grayscale logos can
 * transition smoothly into full color while in view and back out of view.
 */
export function useScrollColorReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [inViewColor, setInViewColor] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const coarseQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    let observer: IntersectionObserver | null = null;

    const setup = () => {
      observer?.disconnect();
      observer = null;
      if (!coarseQuery.matches) {
        setInViewColor(false);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            setInViewColor(entry.isIntersecting);
          }
        },
        {
          rootMargin: "-18% 0px -18% 0px",
          threshold: 0.25,
        },
      );
      observer.observe(el);
    };

    setup();
    coarseQuery.addEventListener("change", setup);

    return () => {
      observer?.disconnect();
      coarseQuery.removeEventListener("change", setup);
    };
  }, []);

  return { ref, inViewColor };
}
