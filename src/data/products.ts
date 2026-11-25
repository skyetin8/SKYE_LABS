export type ProductCategory = "Web App" | "Website" | "Physical Invention";

export type ProductStatus = "Live · Test Now" | "Live Beta" | "In Development" | "Coming Soon";

export interface ProductScreenshot {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  orientation?: "landscape" | "portrait";
  /** Crop wide desktop captures cleanly into a centered portrait mobile frame */
  cropToPortrait?: boolean;
  /** Optional CSS object-position (e.g. "42% 50%") to center off-center captures */
  objectPosition?: string;
}

export interface StudioProduct {
  slug: string;
  index: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
  featured: boolean;
  /** Ordering rank on the homepage when featured (1 = primary flagship, 2+ = featured grid) */
  homepagePriority?: number;
  tagline: string;
  /** Concise scannable copy shown in cards & hero */
  summary: string;
  /** Richer SEO description used in head meta & structured JSON-LD */
  seoDescription: string;
  problem: string;
  approach: string;
  /** e.g. "Web (Live) · iOS & Android Coming Soon" */
  platform: string;
  /** External link to launch/test the web app or visit its standalone site */
  liveUrl?: string;
  liveCtaLabel?: string;
  /** Optional brand accent hex for the live pulsing indicator on the detail page */
  accentColor?: string;
  /** Optional product brandmark SVG/PNG */
  logo?: {
    src: string;
    alt: string;
    blendScreen?: boolean;
  };
  /** Optional standalone wordmark SVG/PNG */
  wordmark?: {
    src: string;
    alt: string;
  };
  /** Primary live workspace screenshot (shown large on the product detail portal) */
  heroScreenshot?: ProductScreenshot;
  /** Optional multi-screen hero triptych (e.g. side-by-side color themes) */
  heroScreenshots?: ProductScreenshot[];
  /** Additional workflow screenshots for the product detail page */
  screenshots?: ProductScreenshot[];
  /** Optional heading override for the screenshots gallery section */
  previewSectionLabel?: string;
  /** Optional decorative custom brand artwork (SVGs/illustrations) for the product page */
  artwork?: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
  howItWorks: Array<{
    step: string;
    title: string;
    detail: string;
  }>;
  capabilities: Array<{
    title: string;
    detail: string;
  }>;
  specs: Array<{
    label: string;
    value: string;
  }>;
}

/**
 * Central studio product catalog.
 *
 * Featured on Homepage (`featured: true`, ordered by `homepagePriority`):
 *   01 FrameFlow (Priority 1)
 *   02 ScriptSymphony (Priority 2)
 *   03 Madam Melody (Priority 3)
 *   04 Glide Departures (Priority 4)
 *   05 Pitchify (Priority 5)
 *
 * Catalog-Only (`featured: false`, live at /products & /products/<slug>):
 *   05 Wink Blink Bang Mafia
 *   07 BurnOut Tracking
 *   08 Lazy Llama Health
 */
export const STUDIO_PRODUCTS: StudioProduct[] = [
  {
    slug: "frameflow",
    index: "01",
    name: "FrameFlow",
    category: "Website",
    status: "Live · Test Now",
    featured: true,
    homepagePriority: 1,
    tagline: "Edit on the move with FrameFlow, your powerful precision in-browser video editor.",
    summary:
      "Multi-track video, GIF, music, and image editing right in your browser, online or offline, with instant local H.264 + AAC MP4 exports.",
    seoDescription:
      "FrameFlow by SKYE_LABS is a zero-download in-browser video editor supporting MP4, MOV, WebM, native frame-by-frame GIF decoding, MP3/WAV/M4A audio, speed & stereo reverb FX, aspect ratio switching, offline local H.264 + AAC MP4 export, and direct YouTube sync.",
    problem:
      "Precision timeline editing shouldn’t require heavy desktop installs, pricey subscriptions, or an active Wi-Fi connection.",
    approach:
      "Zero-download browser architecture with offline local rendering, tactile multi-track controls, and studio audio FX.",
    platform: "Web (Live) · iOS & Android Coming Soon",
    liveUrl: "https://frameflowvideo.vercel.app",
    liveCtaLabel: "Launch FrameFlow",
    accentColor: "#00ABD3",
    logo: {
      src: "/assets/aistudio/Frame_1_c371ce03.svg",
      alt: "FrameFlow brandmark",
    },
    heroScreenshot: {
      src: "/assets/aistudio/Screenshot_2026-11-24_at_4.31.09_AM_12f4e96b.png",
      alt: "FrameFlow live multi-track in-browser video editor workspace with Doodle, Text, Overlay, Visual, and Audio tracks",
      title: "Live Multi-Track Workspace",
      caption:
        "Stack Visual, Overlay, Text, Doodle, and Audio tracks with native local media import and real-time playback.",
      orientation: "landscape",
    },
    screenshots: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_4.37.10_AM_2a33963c.png",
        alt: "FrameFlow Export MP4 Composition modal with local H.264 video and AAC audio rendering and direct YouTube upload",
        title: "Offline MP4 Render & YouTube Sync",
        caption: "Export H.264 + AAC MP4 locally without Wi-Fi, or publish directly to YouTube.",
        orientation: "landscape",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_4.33.51_AM_6e13e095.png",
        alt: "FrameFlow main overview showcasing 16:9, 4:3, 1:1, and 9:16 canvas presets and offline H.264 + AAC engine",
        title: "Instant Aspect Switching",
        caption: "Reframe compositions cleanly across 16:9, 9:16, 4:3, 1:1, and custom ratios.",
        orientation: "landscape",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_4.37.37_AM_862f74b9.png",
        alt: "FrameFlow Audio inspector showing Slowed + Reverb, 0.25x to 4x speed presets, reverse playback, and stereo reverb room decay",
        title: "Speed Curves & Stereo Reverb",
        caption: "Dial 0.25x to 4x speed, Slowed + Reverb, reverse playback, and room decay.",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_4.36.32_AM_61245ecc.png",
        alt: "FrameFlow Doodle Tool brush controls and Brand Kit palette and custom font tools",
        title: "Doodle Canvas & Brand Kit",
        caption: "Sketch directly on frames and lock in reusable color palettes and fonts.",
        orientation: "portrait",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Drop Media In",
        detail: "Import MP4, MOV, WebM, GIF, audio, and images with zero software install.",
      },
      {
        step: "02",
        title: "Cut & Shape",
        detail: "Drag, split, decode GIFs frame-by-frame, switch ratios, and tune audio FX.",
      },
      {
        step: "03",
        title: "Export Offline",
        detail: "Render local H.264 + AAC MP4 without Wi-Fi, or upload straight to YouTube.",
      },
    ],
    capabilities: [
      {
        title: "Zero-Download Multi-Track Editing",
        detail:
          "Edit video, GIFs, music, and images across dedicated tracks directly in Chrome or Safari.",
      },
      {
        title: "Native Frame-by-Frame GIF Decoding",
        detail: "Cut animated GIFs like real video clips with no external converters needed.",
      },
      {
        title: "Offline Editing & H.264 + AAC Export",
        detail: "Keep cutting and render crisp local MP4 files even with zero internet connection.",
      },
      {
        title: "Speed FX, Reverse & Stereo Reverb",
        detail:
          "Apply 0.25x to 4x curves, Slowed + Reverb, Nightcore, Cinematic Half, and gain controls.",
      },
      {
        title: "Aspect Ratios, Brand Kit & YouTube Sync",
        detail:
          "Switch 16:9 / 9:16 / 4:3 / 1:1 canvases, draw doodles, and push renders to YouTube.",
      },
    ],
    specs: [
      { label: "Category", value: "Website" },
      { label: "Status", value: "Live · Test Now" },
      { label: "Live URL", value: "frameflowvideo.vercel.app" },
      { label: "Video & Image Import", value: "MP4 · MOV · WebM · GIF · PNG · JPG · WebP" },
      { label: "Audio Import", value: "MP3 · WAV · M4A" },
      { label: "Export Engine", value: "Local MP4 (H.264 + AAC) · YouTube Sync" },
      { label: "Offline Mode", value: "Edit & Export Without Wi-Fi" },
      { label: "Editions", value: "Free (24h local session) · Pro Suite" },
      { label: "Mobile", value: "iOS & Android Coming Soon" },
    ],
  },
  {
    slug: "script-symphony",
    index: "02",
    name: "ScriptSymphony",
    category: "Website",
    status: "Live Beta",
    featured: true,
    homepagePriority: 2,
    tagline:
      "Scriptwriting and story planning studio built for every phase of your story. Playwriting, screenwriting, and content creation templates available for free.",
    summary:
      "Trade flat, uninspiring white pages for an expressive writing station with World Builder boards, ambient gradient mood lighting, beat sheets, custom content formats, and PDF or .json export compatible with Final Draft Pro and industry peers.",
    seoDescription:
      "ScriptSymphony by SKYE_LABS is an indie browser-based scriptwriting, playwriting, screenwriting, and content-creation studio open in live beta with free templates. Plan worlds and beat sheets before writing a single word, tune ambient gradient mood lighting, and export print PDF or .json compatible with Final Draft Pro, Fade In, WriterDuet, and Highland.",
    problem:
      "Writers spend hours staring at bland, clinical pages that flatten the mood and momentum of the story before it begins.",
    approach:
      "Combine pre-writing World Builder story tools, customizable gradient mood lighting, and clean industry-standard screenplay and creator formats.",
    platform: "Web (Live Beta)",
    liveUrl: "https://scriptsymphony.vercel.app",
    liveCtaLabel: "Enter Studio Beta",
    accentColor: "#A4E209",
    logo: {
      src: "/assets/aistudio/SS_Logo_69e65753.svg",
      alt: "ScriptSymphony brandmark",
      blendScreen: true,
    },
    heroScreenshot: {
      src: "/assets/aistudio/Screenshot_2026-11-24_at_2.30.19_AM_e381dd83.png",
      alt: "ScriptSymphony screenwriting editor with maroon Ambient Mood Lighting, Charcoal page surface, scene navigation, and Export PDF",
      title: "Atmospheric Screenwriting Workspace",
      caption:
        "Tune your writing station’s ambient gradient glow, switch page surfaces, and stay locked into scene headings, dialogue, and PDF export.",
      orientation: "landscape",
    },
    screenshots: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_2.21.11_AM_64461109.png",
        alt: "ScriptSymphony warm gradient welcome screen reading Time to write your masterpiece with Enter the Studio button",
        title: "Atmospheric Studio Entrance",
        caption:
          "Step out of sterile blank documents into an expressive indie writing studio built to match the mood of your story.",
        orientation: "landscape",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_2.33.15_AM_ae310a00.png",
        alt: "ScriptSymphony World Builder visual board with Nora and location story note cards and custom color palette swatches",
        title: "World Builder & Story Notes",
        caption:
          "Understand your world before writing a word. Organize characters, locations, look & pacing notes, and custom color palettes on an infinite canvas.",
        orientation: "landscape",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_2.35.25_AM_c4b7c784.png",
        alt: "ScriptSymphony industry-standard screenplay element controls showing Scene Heading, Action, Character, Parenthetical, Dialogue, and Transition",
        title: "Intuitive Screenplay & Playwriting Controls",
        caption:
          "Move seamlessly across Scene Headings, Action, Character, Parenthetical, Dialogue, and Transitions without breaking writing flow.",
        orientation: "landscape",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_2.29.15_AM_cede41f7.png",
        alt: "ScriptSymphony Content Creation workspace displaying Audience Retention Script Framework with Hook, Lock-In Zone, and spoken duration estimates",
        title: "Content Creation & Custom Formats",
        caption:
          "Draft video essays, short-form hooks, and structured creator frameworks complete with section beats, word counts, and spoken duration.",
        orientation: "landscape",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Build the World First",
        detail:
          "Map characters, locations, visual mood swatches, and beat sheets in the World Builder before drafting your opening scene.",
      },
      {
        step: "02",
        title: "Set Tone & Atmosphere",
        detail:
          "Adjust ambient gradient lighting and page surface tones so your workspace mirrors the emotional register of your story.",
      },
      {
        step: "03",
        title: "Draft & Export Anywhere",
        detail:
          "Write with screenplay, playwriting, or custom formats and export print-ready PDF or .json compatible with Final Draft Pro and peers.",
      },
    ],
    capabilities: [
      {
        title: "Pre-Writing World Builder & Beat Sheets",
        detail:
          "Clarify character voice, setting details, visual palettes, and scene beats before writing your first line of dialogue.",
      },
      {
        title: "Ambient Mood Gradient & Page Surfaces",
        detail:
          "Customize gradient wash colors, intensity, and paper tones across Classic White, Warm Ivory, Parchment, and Charcoal.",
      },
      {
        title: "Industry-Standard Script & Stage Controls",
        detail:
          "Format Scene Headings, Action, Character, Parenthetical, Dialogue, and Transitions quickly for screenplays and plays.",
      },
      {
        title: "Content Creation & Custom Formats",
        detail:
          "Switch beyond cinema into structured content creation frameworks with retention beats, word counts, and spoken-time tracking.",
      },
      {
        title: "PDF & .json Export (Final Draft Pro Ready)",
        detail:
          "Export clean screenplay PDFs or structured .json project files designed to interoperate with Final Draft Pro, Fade In, WriterDuet, and Highland.",
      },
    ],
    specs: [
      { label: "Category", value: "Website" },
      { label: "Status", value: "Live Beta · Open for Testing" },
      { label: "Live URL", value: "scriptsymphony.vercel.app" },
      { label: "Formats", value: "Screenwriting · Playwriting · Content · Custom" },
      { label: "Planning Suite", value: "World Builder · Beat Sheets · Mood Swatches" },
      { label: "Atmosphere", value: "Custom Gradient Wash · 4 Page Surfaces" },
      { label: "Export & Compat", value: "PDF · .json (Final Draft Pro, Fade In, WriterDuet)" },
      { label: "Edition", value: "Indie Open Beta" },
    ],
  },
  {
    slug: "madam-melody",
    index: "03",
    name: "Madam Melody",
    category: "Web App",
    status: "Live · Test Now",
    featured: true,
    homepagePriority: 3,
    tagline: "Record beats for your favorite songs in this live piano-tile game.",
    summary:
      "Play your own music, build and share groove tracks in a public library, score points, and perfect your craft.",
    seoDescription:
      "Madam Melody by SKYE_LABS: record beats for your favorite songs in a live browser piano-tile rhythm game. Play your own music via Songs, BPM Jam, or Live Mic, layer groove tracks for a public library, score streaks, and get ready for iOS and Android.",
    problem:
      "Play along to the songs you actually listen to, instead of locked, pre-packaged rhythm tracklists.",
    approach:
      "Play your music from any source, map tiles and holds live, and share groove tracks to a public library.",
    platform: "Web (Live) · iOS & Android Coming Soon",
    liveUrl: "https://madam-melody.vercel.app",
    liveCtaLabel: "Launch Madam Melody",
    accentColor: "#18C8FF",
    logo: {
      src: "/assets/aistudio/Madam-Melody_Logo_e2f0057d.png",
      alt: "Madam Melody brandmark",
      blendScreen: true,
    },
    heroScreenshot: {
      src: "/assets/aistudio/Screenshot_2026-11-24_at_7.10.47_PM_5b3ffc86.png",
      alt: "Madam Melody Electric theme home screen with headphone mascot, Best score, streak counter, and Jam CTA",
      title: "Madam Melody Web App",
      caption: "Jam to your music, map the beat, and share groove tracks with others.",
      orientation: "portrait",
    },
    heroScreenshots: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_7.10.08_PM_2758e584.png",
        alt: "Madam Melody Solar yellow theme home screen with headphone mascot and Tap blob to switch vibe",
        title: "Solar Theme",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_7.10.47_PM_5b3ffc86.png",
        alt: "Madam Melody Electric cyan theme home screen with headphone mascot and Best score counter",
        title: "Electric Theme",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_7.11.43_PM_e6ca06cf.png",
        alt: "Madam Melody Ruby red theme home screen with headphone mascot and Best score counter",
        title: "Ruby Theme",
        orientation: "portrait",
      },
    ],
    screenshots: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_7.12.53_PM_f2213a4b.png",
        alt: "Madam Melody Songs library picker and vinyl turntable screen in Ruby theme",
        title: "Pick Your Song",
        caption: "Search tracks or spin your own music.",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_7.13.56_PM_05cfb52f.png",
        alt: "Madam Melody Tap Your Groove recording lane screen for Spotify, YouTube Music, or speakers",
        title: "Record Groove Tracks",
        caption: "Tap tiles, hold notes, and swipe arrows in real time.",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_7.16.17_PM_2fd91a1d.png",
        alt: "Madam Melody live gameplay with falling directional tiles, 174 BPM counter, and Layer On Top controls",
        title: "Layer & Score",
        caption: "Snap to beat, layer passes, and chase high streaks.",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_7.18.24_PM_7c5e894a.png",
        alt: "Madam Melody Live Mic spatial rhythm detection mode syncing tempo and energy to room audio",
        title: "Live Mic & BPM Jam",
        caption: "Sync directly to room audio or dial any tempo.",
        orientation: "portrait",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Play Your Music",
        detail: "Search songs, set BPM Jam tempo, or listen via Live Mic.",
      },
      {
        step: "02",
        title: "Record the Groove",
        detail: "Tap tiles, hold long notes, and swipe arrows on beat.",
      },
      {
        step: "03",
        title: "Share & Score",
        detail: "Publish groove tracks to the public library and chase higher streaks.",
      },
    ],
    capabilities: [
      {
        title: "Songs, BPM Jam & Live Mic",
        detail: "Jam to Spotify, YouTube Music, local audio, custom BPM, or live room sound.",
      },
      {
        title: "Custom Groove Tracks",
        detail: "Record, layer passes, snap to beat, and publish charts to the public library.",
      },
      {
        title: "Score & Streak Craft",
        detail: "Hit tiles cleanly, build streaks, and dial difficulty from Easy to Hard.",
      },
      {
        title: "Switchable Vibes",
        detail: "Flip live between Solar, Electric, Ultraviolet, and Ruby visuals.",
      },
    ],
    specs: [
      { label: "Category", value: "Web App" },
      { label: "Status", value: "Live · Test Now" },
      { label: "Live URL", value: "madam-melody.vercel.app" },
      { label: "Modes", value: "Songs · BPM Jam · Live Mic" },
      { label: "Controls", value: "Tap · Hold · Swipe" },
      { label: "Platforms", value: "Web (Live) · iOS & Android Coming Soon" },
    ],
  },
  {
    slug: "glide-departures",
    index: "04",
    name: "Glide Departures",
    category: "Web App",
    status: "In Development",
    featured: true,
    homepagePriority: 4,
    tagline:
      "Live departure and security line tracking app right in your pocket for the next time you fly.",
    summary:
      "Everything you need for travel day in one pocket companion: live security wait times, flight prep reminders and alarms, takeoff and landing notifications for loved ones, shared doodles, and a two-minute breathing zone for nervous flyers.",
    seoDescription:
      "Glide Departures by SKYE_LABS is an upcoming departure and security line tracking app currently in development. Track live airport wait times, schedule flight reminders and alarms, notify loved ones on takeoff and landing, send and receive calming doodles, and take a two-minute breathing break before you fly.",
    problem:
      "Travel day splits your attention across security lines, departure gates, forgotten alarms, pre-flight nerves, and loved ones wondering if you made it safely.",
    approach:
      "Unify live security line tracking, flight reminders, loved-one takeoff and landing alerts, shared doodles, and a two-minute breathing reset in one calm travel-day app.",
    platform: "In Development · Web, iOS & Android Coming Soon",
    liveCtaLabel: "Join Early Access",
    accentColor: "#68C8EC",
    logo: {
      src: "/assets/aistudio/Vector_2_e19f8fd4.svg",
      alt: "Glide Departures brandmark",
    },
    heroScreenshot: {
      src: "/assets/aistudio/Glide_App_Screen__1__b307dc71.png",
      alt: "Glide Departures concept screen showing 25-minute security line wait time, Gate A51, Airport MCO, Notify Me, De-Stress, Set Alarm, and departure countdown",
      title: "Glide Departures Concept",
      caption:
        "Early design mockups. Glide Departures is currently in development and not yet available to use.",
      orientation: "portrait",
    },
    heroScreenshots: [
      {
        src: "/assets/aistudio/Glide_App_Screen_933e3c2a.png",
        alt: "Glide Departures concept welcome screen reading Less Waiting. More going.",
        title: "Welcome Concept",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Glide_App_Screen__1__b307dc71.png",
        alt: "Glide Departures concept dashboard with live security line wait time, Notify Me, De-Stress, Set Alarm, Gate A51, Airport MCO, and departure timer",
        title: "Live Departure & Security Tracker",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/De-Stress__2__da034ea6.png",
        alt: "Glide Departures Breathe Deeply concept screen for a two-minute pre-flight breathing reset",
        title: "Two-Minute Breather",
        orientation: "portrait",
      },
    ],
    previewSectionLabel: "Early Concept Mockups · Not Yet Live",
    screenshots: [
      {
        src: "/assets/aistudio/Log_In_3a367525.png",
        alt: "Glide Departures concept screen with options to Schedule A Flight Reminder, I am about to take a flight, or I am a loved one",
        title: "Reminders & Loved-One Mode",
        caption:
          "Schedule prep reminders and alarms, start a trip, or join as a loved one for live flight updates.",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Line_Identify_Questions_5fad29e3.png",
        alt: "Glide Departures concept airport picker screen showing Miami International Airport (MIA)",
        title: "Pick Your Departing Airport",
        caption:
          "Select your airport to check live security line wait estimates and gate countdowns.",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/De-Stress__1__4d6d57bf.png",
        alt: "Glide Departures De-Stress hub concept screen with Quick Breather timer, Scribbles, and Doodles from loved ones",
        title: "Pre-Flight De-Stress Zone",
        caption:
          "Jump into a two-minute breathing reset, scribble at the gate, or view incoming notes.",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/De-Stress_cc2eea41.png",
        alt: "Glide Departures Send A Doodle concept screen with sticky-note drawing canvas and color palette",
        title: "Send & Receive Doodles",
        caption:
          "Sketch a sticky-note doodle to reassure a nervous flyer, or send one back to family.",
        orientation: "portrait",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Plan & Track Live",
        detail:
          "Schedule flight prep reminders and backup alarms, then follow live security line wait times and departure countdowns at your airport.",
      },
      {
        step: "02",
        title: "Notify Loved Ones",
        detail:
          "Keep family and friends in the loop automatically when you’re taking off and the moment your flight lands.",
      },
      {
        step: "03",
        title: "Calm Travel Nerves",
        detail:
          "Step into a two-minute guided breathing zone at the airport or trade quick doodles with loved ones before boarding.",
      },
    ],
    capabilities: [
      {
        title: "Live Security Line & Departure Tracking",
        detail:
          "Check estimated security wait times, gate info, and time to departure right from your pocket.",
      },
      {
        title: "Takeoff & Landing Alerts for Loved Ones",
        detail:
          "Automatically notify the people waiting on you when you take off and as soon as you land.",
      },
      {
        title: "Flight Reminders & Backup Alarms",
        detail:
          "Schedule reminders to get ready and set dedicated alarms so you never forget or miss a flight.",
      },
      {
        title: "Doodles Between Flyers & Loved Ones",
        detail:
          "Send and receive hand-drawn sticky-note doodles to stay connected when either side feels nervous about flying.",
      },
      {
        title: "Two-Minute Breathing Meditation Zone",
        detail:
          "Take a guided two-minute breather anywhere in the airport to decompress before boarding.",
      },
    ],
    specs: [
      { label: "Category", value: "Web App" },
      { label: "Status", value: "In Development (Not Live Yet)" },
      { label: "Previews", value: "Early Concept Mockups" },
      { label: "Core Tools", value: "Security Wait Times · Departure Timer · Alarms" },
      { label: "Loved Ones", value: "Takeoff & Landing Alerts · Shared Doodles" },
      { label: "Calm Mode", value: "2-Minute Breathing Meditation Zone" },
      { label: "Platform", value: "Web · iOS · Android (Coming Soon)" },
    ],
  },
  {
    slug: "wink-blink-bang-mafia",
    index: "05",
    name: "Wink Blink Bang Mafia",
    category: "Web App",
    status: "Live · Test Now",
    featured: false,
    tagline:
      "Fast-paced in-person Mafia with mobile role assignment, secret winks, live voting, and ranked points, built to play anywhere with friends.",
    summary:
      "Turn theme park lines, errands, and hangouts into quick, high-stakes rounds of real-world Mafia, like Heads Up meets social deduction. Open your sealed role on your phone, eliminate opponents with subtle winks without getting spotted, vote out the Mafia, and climb competitive point leagues.",
    seoDescription:
      "Wink Blink Bang Mafia by SKYE_LABS is a live browser-based mobile role assigner for fast-paced in-person Mafia. Play with friends in theme park lines, running errands, or hanging out. Wink secretly to eliminate opponents, vote out the Mafia, and rank up across competitive point leagues.",
    problem:
      "Quick in-person group games shine while waiting in line or hanging out, but classic Mafia usually stalls on cards, moderators, and slow setup.",
    approach:
      "Put private role envelopes, phones-down winking rounds, lock-in voting, and competitive points rankings right in your browser with no download needed.",
    platform: "Web (Live) · Downloadable App Coming Soon",
    liveUrl: "https://winkblinkmafia.vercel.app",
    liveCtaLabel: "Launch Wink Blink Bang Mafia",
    accentColor: "#26B8FF",
    logo: {
      src: "/assets/aistudio/wink_blink_bang_logo_copy_f5790392.svg",
      alt: "Wink Blink Bang Mafia brandmark",
    },
    artwork: [
      {
        src: "/assets/aistudio/mafia_hat_vectorized_1aefdc76.svg",
        alt: "Hand-drawn Mafia fedora and sunglasses illustration",
        label: "Undercover Mafia",
      },
      {
        src: "/assets/aistudio/mafia_gem_transparent_fc771130.svg",
        alt: "Hand-drawn competitive league gems illustration",
        label: "Ranked Gems",
      },
    ],
    heroScreenshot: {
      src: "/assets/aistudio/Screenshot_2026-11-24_at_8.46.03_PM_07bd4fec.png",
      alt: "Wink Blink Bang Mafia live round screen reading Who Is The Mafia with Bang and Open Voting controls",
      title: "Wink Blink Bang Mafia Web App",
      caption:
        "Phones down, eyes up. Assign secret roles in seconds, wink without getting caught, and vote out the Mafia.",
      orientation: "portrait",
      cropToPortrait: true,
      objectPosition: "42% 50%",
    },
    heroScreenshots: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.38.30_PM_3ed03ad5.png",
        alt: "Wink Blink Bang Mafia home screen displaying 1550 points, Gold league badge, Locate Group, and Create a New Group",
        title: "Home & Leagues",
        orientation: "portrait",
        cropToPortrait: true,
        objectPosition: "50% 50%",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.46.03_PM_07bd4fec.png",
        alt: "Wink Blink Bang Mafia live round screen with Bang elimination control and Open Voting button",
        title: "Live Round",
        orientation: "portrait",
        cropToPortrait: true,
        objectPosition: "42% 50%",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.47.21_PM_63edd248.png",
        alt: "Wink Blink Bang Mafia voting screen letting players pick a suspect and press and hold to lock vote",
        title: "Group Voting",
        orientation: "portrait",
        cropToPortrait: true,
        objectPosition: "40% 50%",
      },
    ],
    screenshots: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.44.34_PM_9cf22ea4.png",
        alt: "Wink Blink Bang Mafia secret envelope screen reading The Mafia Awaits and Open Your Envelope",
        title: "Private Role Envelopes",
        caption: "Keep your phone to yourself and tap open your sealed role before play begins.",
        orientation: "portrait",
        cropToPortrait: true,
        objectPosition: "50% 50%",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.41.39_PM_ba3f3e71.png",
        alt: "Wink Blink Bang Mafia tutorial card showing Wink To Eliminate eye artwork and rules",
        title: "Wink To Eliminate",
        caption:
          "Eliminate opponents with a subtle wink in real life without letting the rest of the group catch you.",
        orientation: "portrait",
        cropToPortrait: true,
        objectPosition: "50% 50%",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.45.22_PM_05a1bb95.png",
        alt: "Wink Blink Bang Mafia sealed role reveal reading You Are Not The Mafia. Watch closely.",
        title: "Phones Down, Eyes Up",
        caption:
          "Built for lines, errands, and hangouts. Put screens away and read the people around you.",
        orientation: "portrait",
        cropToPortrait: true,
        objectPosition: "50% 50%",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.38.53_PM_7f11cdda.png",
        alt: "Wink Blink Bang Mafia Points and Leagues standings showing Bronze, Silver, Gold, Platinum, Obsidian, Diamond, and Legendary tiers",
        title: "Points & League Standings",
        caption: "Win rounds to rack up points and climb from Bronze and Gold up to Legendary.",
        orientation: "portrait",
        cropToPortrait: true,
        objectPosition: "50% 50%",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Start a Group Anywhere",
        detail:
          "Share a quick code or QR with friends in line, running errands, or hanging out. Plays right in any mobile browser.",
      },
      {
        step: "02",
        title: "Open Roles & Wink Quietly",
        detail:
          "Peek at your sealed envelope, put phones down, and stay sharp while the Mafia secretly winks opponents out.",
      },
      {
        step: "03",
        title: "Vote & Rank Up",
        detail:
          "Lock in votes to catch the Mafia before they clear the group. Winners earn points and climb the leagues.",
      },
    ],
    capabilities: [
      {
        title: "Instant Mobile Role Assigner",
        detail:
          "Skip paper slips and hosts. Every player opens a private sealed envelope directly on their phone.",
      },
      {
        title: "Built for Real-World Hangouts",
        detail:
          "Designed for fast, Heads Up style energy you can pick up in theme park lines, errands, or group hangouts.",
      },
      {
        title: "Secret Wink Eliminations",
        detail:
          "Mafias win by winking at opponents without being spotted by anyone else in the group.",
      },
      {
        title: "Live Suspect Voting",
        detail:
          "Call voting when your group has a hunch, press and hold to lock your pick, and expose the liar.",
      },
      {
        title: "Points Ranking & Leagues",
        detail:
          "Bank points for every victory and climb seven competitive tiers from Bronze through Legendary.",
      },
    ],
    specs: [
      { label: "Category", value: "Web App" },
      { label: "Status", value: "Live · Play on Web Now" },
      { label: "Live URL", value: "winkblinkmafia.vercel.app" },
      { label: "Game Style", value: "In-Person Group · Mobile Role Assigner" },
      { label: "Core Loop", value: "Sealed Roles · Secret Winks · Group Vote" },
      { label: "Ranking", value: "Points & 7 Competitive Leagues" },
      { label: "Platform", value: "Web (Live) · Downloadable App Coming Soon" },
    ],
  },
  {
    slug: "pitchify",
    index: "06",
    name: "Pitchify",
    category: "Web App",
    status: "Live Beta",
    featured: true,
    homepagePriority: 5,
    tagline:
      "Ear training game for note recognition practice. Welcomes those in all stages of their musical journey.",
    summary:
      "Plenty of levels for beginners and pros to enjoy. Progress from Beginner and Apprentice through Virtuoso, Maestro, Harmonizer, and Prodigy, plus practice anytime with the built-in metronome, live pitch tuner, and Free Play piano.",
    seoDescription:
      "Pitchify by SKYE_LABS is an ear training web app in live beta for note and chord recognition practice. Designed for all stages of your musical journey with Beginner through Prodigy levels, a live mic pitch meter tuner, customizable metronome, and Free Play piano.",
    problem:
      "Training your ear shouldn’t feel intimidating for beginners or overly simple for seasoned musicians.",
    approach:
      "Combine structured note and harmony recognition levels for every skill stage with an everyday pitch tuner, metronome, and Free Play piano right in the browser.",
    platform: "Web (Live Beta) · iOS & Android Coming Soon",
    liveUrl: "https://pitchify-music.vercel.app",
    liveCtaLabel: "Launch Pitchify Beta",
    accentColor: "#A855F7",
    logo: {
      src: "/assets/aistudio/Option_7_857b3ada.png",
      alt: "Pitchify brandmark",
      blendScreen: true,
    },
    wordmark: {
      src: "/assets/aistudio/Group_84_6fb3f57e.svg",
      alt: "Pitchify wordmark",
    },
    heroScreenshot: {
      src: "/assets/aistudio/Screenshot_2026-11-24_at_8.53.54_PM_002c09f0.png",
      alt: "Pitchify Ear Trainer home screen with weekly streak tracker, Training Game, Pitch Meter, and Free Play cards",
      title: "Pitchify Ear Trainer",
      caption:
        "Train note and harmony recognition across every level, plus practice pitch with the built-in tuner, metronome, and Free Play piano.",
      orientation: "portrait",
    },
    heroScreenshots: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.56.59_PM_8d61ebbe.png",
        alt: "Pitchify Harmonizer Level 1 chord ear-training screen with glowing purple C and yellow E piano keys",
        title: "Harmonizer Mode",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.53.54_PM_002c09f0.png",
        alt: "Pitchify Ear Trainer home screen showing Level 6 progress, Training Game, Pitch Meter, and Free Play",
        title: "Pitchify Home",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.56.25_PM_cbcd2fbc.png",
        alt: "Pitchify Virtuoso Level 1 chromatic note wheel with sharps, flats, and glowing purple C note",
        title: "Virtuoso Mode",
        orientation: "portrait",
      },
    ],
    screenshots: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.55.14_PM_ea260143.png",
        alt: "Pitchify level selection screen featuring Beginner, Apprentice, Virtuoso, Maestro, Harmonizer, and Prodigy tiers",
        title: "Levels for Every Stage",
        caption:
          "Plenty of levels for beginners and pros. Climb from Beginner and Apprentice to Maestro and Prodigy.",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_8.54.32_PM_6409ab4d.png",
        alt: "Pitchify Pitch Meter live microphone tuner showing E note intonation alongside an 80 BPM 4/4 metronome",
        title: "Pitch Tuner & Metronome",
        caption:
          "Check real-time intonation with the live mic pitch meter and lock in rhythm with adjustable BPM and time signatures.",
        orientation: "portrait",
      },
      {
        src: "/assets/aistudio/Screenshot_2026-11-24_at_10.20.21_PM_0dc58abb.png",
        alt: "Pitchify Free Play interactive piano showing glowing B4 key, OCT 4-6 switcher, Piano instrument selector, and Sustain toggle",
        title: "Free Play Piano",
        caption:
          "Test and practice your pitch freely across octaves with live note feedback, sustain, and switchable instruments.",
        orientation: "portrait",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Start at Your Level",
        detail:
          "Choose from Beginner, Apprentice, Virtuoso, Maestro, Harmonizer, or Prodigy, built for newcomers and seasoned players alike.",
      },
      {
        step: "02",
        title: "Train Your Ear Daily",
        detail:
          "Listen closely, identify notes and harmonies across interactive wheels and keyboards, and keep your daily streak alive.",
      },
      {
        step: "03",
        title: "Tune, Keep Time & Free Play",
        detail:
          "Open the built-in live mic tuner, BPM metronome, or Free Play piano whenever you want hands-on pitch practice.",
      },
    ],
    capabilities: [
      {
        title: "Levels for Beginners & Pros",
        detail:
          "Progress through Beginner, Apprentice, Virtuoso, Maestro, Harmonizer, and Prodigy stages at your own pace.",
      },
      {
        title: "Note & Harmony Recognition",
        detail:
          "Sharpen single-note accuracy, chromatic sharps and flats, and multi-note chord listening in bite-sized rounds.",
      },
      {
        title: "Built-In Pitch Tuner & Metronome",
        detail:
          "Check your vocal or instrument pitch live via microphone and practice steadily with custom BPM and time signatures.",
      },
      {
        title: "Free Play Piano Sandbox",
        detail:
          "Play across multiple octaves with live note badges, sustain, and instrument switching to reinforce pitch memory.",
      },
    ],
    specs: [
      { label: "Category", value: "Web App" },
      { label: "Status", value: "Live Beta · Open for Testing" },
      { label: "Live URL", value: "pitchify-music.vercel.app" },
      {
        label: "Skill Tiers",
        value: "Beginner · Apprentice · Virtuoso · Maestro · Harmonizer · Prodigy",
      },
      { label: "Practice Suite", value: "Pitch Meter Tuner · Metronome · Free Play Piano" },
      { label: "Platform", value: "Web (Live Beta) · iOS & Android Coming Soon" },
    ],
  },
  {
    slug: "burnout",
    index: "07",
    name: "BurnOut Tracking",
    category: "Web App",
    status: "In Development",
    featured: false,
    tagline:
      "A gentle BurnOut companion that prioritizes your peace, daily rhythm, and work-life balance over productivity streaks.",
    summary:
      "More than a regular habit tracker, BurnOut creates a safe space to feel and check in with yourself. Regular rhythm prompts, supportive mental-health check-ins, and a mosaic of emotions help prevent overwork. Built for personal use only, not medical advice.",
    seoDescription:
      "BurnOut Tracking by SKYE_LABS is an upcoming personal-use wellness app in development to help prevent overwork through daily rhythm prompts, gentle check-ins, and mosaic of emotions tracking, prioritizing peace and work-life balance over output.",
    problem:
      "Most habit and productivity apps push you to keep grinding, ignoring early signs of overwork until exhaustion takes over.",
    approach:
      "Offer friendly daily check-ins, personalized rhythm prompts, and a visual mosaic of emotions that put work-life balance and a safe space to feel first.",
    platform: "In Development · Web, iOS & Android Coming Soon",
    liveCtaLabel: "Join Early Access",
    howItWorks: [
      {
        step: "01",
        title: "Find Your Daily Rhythm",
        detail:
          "Set the pace and boundaries that actually fit your life, supported by regular prompts that nudge you back into balance.",
      },
      {
        step: "02",
        title: "Check In & Map Emotions",
        detail:
          "Take low-pressure daily check-ins and track how you’re feeling over time in a personal mosaic of emotions.",
      },
      {
        step: "03",
        title: "Protect Your Peace",
        detail:
          "Spot burnout patterns early and give yourself permission to slow down, prioritizing rest and wellbeing over checking boxes.",
      },
    ],
    capabilities: [
      {
        title: "Daily Rhythm & Anti-Overwork Prompts",
        detail:
          "Regular, friendly prompts that help you stay in your preferred daily rhythm and prevent overworking yourself.",
      },
      {
        title: "Mosaic of Emotions Tracking",
        detail:
          "Log and reflect on your feelings day by day in a visual emotional mosaic built for personal self-awareness.",
      },
      {
        title: "Peace Over Productivity",
        detail:
          "Built differently from standard habit trackers, prioritizing work-life balance, rest, and a safe space to feel.",
      },
      {
        title: "Personal Wellness Companion",
        detail:
          "A supportive everyday check-in tool for personal reflection only. Not medically certified and never a substitute for medical advice.",
      },
    ],
    specs: [
      { label: "Category", value: "Web App" },
      { label: "Status", value: "In Development (Not Live Yet)" },
      { label: "Focus", value: "BurnOut Prevention · Work-Life Balance" },
      { label: "Core Tools", value: "Daily Check-Ins · Rhythm Prompts · Emotion Mosaic" },
      { label: "Notice", value: "Personal Use Only · Not Medical Advice" },
      { label: "Platform", value: "Web · iOS · Android (Coming Soon)" },
    ],
  },
  {
    slug: "lazyllama-health-app",
    index: "08",
    name: "Lazy Llama Health",
    category: "Web App",
    status: "In Development",
    featured: false,
    tagline:
      "An easy, low-pressure first step into healthy baseline living, built for people overwhelmed by all-or-nothing fitness apps.",
    summary:
      "Healthy living shouldn’t require training like a pro athlete. Lazy Llama Health looks at your current lifestyle and offers realistic daily and weekly suggestions to help you build approachable habits around nutrition, sleep and waking hours, sleep deficit awareness, optional medication reminders, and gradual movement.",
    seoDescription:
      "Lazy Llama Health by SKYE_LABS is an upcoming entry-level lifestyle wellness app in development. Designed for people overwhelmed by intense fitness apps, offering realistic daily and weekly suggestions for baseline nutrition, sleep rhythms, optional medication reminders, and sustainable movement.",
    problem:
      "Fitness and health apps often feel all-or-nothing, built for pro athletes while leaving everyday beginners too overwhelmed to start.",
    approach:
      "Look at your real day-to-day lifestyle and offer gentle daily or weekly suggestions to establish healthy baseline habits at a comfortable pace.",
    platform: "In Development · Web, iOS & Android Coming Soon",
    liveCtaLabel: "Join Early Access",
    howItWorks: [
      {
        step: "01",
        title: "Start Where You Are",
        detail:
          "Share your current everyday routine with no extreme fitness goals, rigid rules, or pro-athlete expectations.",
      },
      {
        step: "02",
        title: "Follow Gentle Suggestions",
        detail:
          "Get realistic daily and weekly prompts covering entry-level nutrition, sleep and wake consistency, and simple self-care rhythms.",
      },
      {
        step: "03",
        title: "Grow Sustainable Habits",
        detail:
          "Use optional time-of-day medication reminders and steady baseline momentum to naturally ease into physical exercise over time.",
      },
    ],
    capabilities: [
      {
        title: "Lifestyle-First Baseline Suggestions",
        detail:
          "Examines your current routine to offer approachable daily and weekly steps toward healthy baseline living.",
      },
      {
        title: "Entry-Level Nutrition Guidance",
        detail:
          "Simple, non-overwhelming everyday food suggestions focused on building steady nourishment rather than strict dieting.",
      },
      {
        title: "Sleep, Wake & Sleep-Deficit Rhythm",
        detail:
          "Track sleeping and waking hours and understand sleep deficit patterns so rest feels manageable again.",
      },
      {
        title: "Optional Medication Reminders",
        detail:
          "Set helpful time-of-day reminders for medications you already take. Strictly informational and never medical advice.",
      },
      {
        title: "Gradual Exercise Momentum",
        detail:
          "Once your everyday rhythm feels steady, gently layer in approachable physical movement without burnout.",
      },
    ],
    specs: [
      { label: "Category", value: "Web App" },
      { label: "Status", value: "In Development (Not Live Yet)" },
      { label: "Focus", value: "Entry-Level Baseline Health · Low-Pressure Habits" },
      { label: "Core Areas", value: "Nutrition · Sleep & Wake Rhythm · Medication Reminders" },
      { label: "Notice", value: "Personal Learning Tool Only · Not Medical Advice" },
      { label: "Platform", value: "Web · iOS · Android (Coming Soon)" },
    ],
  },
];

export function getProductBySlug(slug: string): StudioProduct | undefined {
  return STUDIO_PRODUCTS.find((p) => p.slug === slug);
}
