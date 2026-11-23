export type ProductCategory = "Web App" | "Website" | "Physical Invention";

export type ProductStatus = "Live — Test Now" | "In Beta" | "In Development" | "Coming Soon";

export interface ProductScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface StudioProduct {
  slug: string;
  index: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
  featured: boolean;
  tagline: string;
  summary: string;
  problem: string;
  approach: string;
  /** e.g. "Web (Available Now) · iOS & Android Coming Soon" */
  platform: string;
  /** External link to launch/test the web app or visit its standalone site */
  liveUrl?: string;
  liveCtaLabel?: string;
  /** Primary screenshot (shown in catalog & hero) */
  heroScreenshot?: ProductScreenshot;
  /** Additional screenshots for the app's dedicated landing page */
  screenshots?: ProductScreenshot[];
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
 * Replace placeholder copy and add screenshots/liveUrls as assets are provided.
 */
export const STUDIO_PRODUCTS: StudioProduct[] = [
  {
    slug: "frameflow",
    index: "01",
    name: "FrameFlow",
    category: "Web App",
    status: "Live — Test Now",
    featured: true,
    tagline:
      "A high-quality, user-friendly film and video editor that runs directly in your browser—no downloads required.",
    summary:
      "FrameFlow brings timeline editing straight to the browser so creators and filmmakers can cut, arrange, and refine video without heavy installs or steep learning curves.",
    problem:
      "Professional video editors demand large downloads, expensive hardware, and complex setups, while lightweight browser tools often sacrifice control and output quality.",
    approach:
      "Build a responsive, zero-install browser studio that balances clean precision with an approachable interface anyone can open and use immediately.",
    platform: "Web (Live) · iOS & Android Coming Soon",
    liveCtaLabel: "Launch FrameFlow",
    howItWorks: [
      {
        step: "01",
        title: "Open In Browser",
        detail: "Start editing right away in your browser with zero software downloads.",
      },
      {
        step: "02",
        title: "Cut & Arrange",
        detail: "Assemble clips on a clean, responsive timeline built for speed and clarity.",
      },
      {
        step: "03",
        title: "Export & Share",
        detail: "Render crisp video output directly from your workspace.",
      },
    ],
    capabilities: [
      {
        title: "Zero-Download Browser Editing",
        detail: "Works directly in the browser without waiting on installers or heavy local setup.",
      },
      {
        title: "High-Quality Output",
        detail: "Engineered for clean cuts and dependable rendering without compromising fidelity.",
      },
      {
        title: "Mobile Apps Next",
        detail: "Native iOS and Android editions are on the roadmap following web testing.",
      },
    ],
    specs: [
      { label: "Category", value: "Web App" },
      { label: "Status", value: "Live — Test Now" },
      { label: "Web", value: "Available Now" },
      { label: "Mobile", value: "iOS & Android Coming Soon" },
    ],
  },
  {
    slug: "script-symphony",
    index: "02",
    name: "Script Symphony",
    category: "Website",
    status: "In Beta",
    featured: true,
    tagline: "A dedicated web platform built for writers, storytellers, and creative scripts.",
    summary:
      "Script Symphony is a focused web experience built under SKYE_LABS—ready to connect with its standalone landing page and full description.",
    problem:
      "Placeholder problem statement—ready for your exact copy describing what Script Symphony solves.",
    approach: "Placeholder design direction—ready for your exact copy and screenshots.",
    platform: "Website",
    liveCtaLabel: "Visit Script Symphony",
    howItWorks: [
      {
        step: "01",
        title: "Step One",
        detail: "Add your workflow details here once finalized.",
      },
      {
        step: "02",
        title: "Step Two",
        detail: "Add your workflow details here once finalized.",
      },
      {
        step: "03",
        title: "Step Three",
        detail: "Add your workflow details here once finalized.",
      },
    ],
    capabilities: [
      {
        title: "Web-First Experience",
        detail: "Accessible directly online as a dedicated website.",
      },
    ],
    specs: [
      { label: "Category", value: "Website" },
      { label: "Status", value: "In Beta" },
      { label: "Platform", value: "Web" },
    ],
  },
];

export function getProductBySlug(slug: string): StudioProduct | undefined {
  return STUDIO_PRODUCTS.find((p) => p.slug === slug);
}
