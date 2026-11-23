import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { STUDIO_PRODUCTS, type StudioProduct } from "@/data/products";
import { Signup } from "@/components/site/Signup";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKYE_LABS — Invention Studio, NYC" },
      {
        name: "description",
        content:
          "An independent New York City invention studio creating original products that resolve real-life friction. Intelligent Design · Urban Mission · Limitless Impact.",
      },
      { property: "og:title", content: "SKYE_LABS — Never Impossible" },
      {
        property: "og:description",
        content:
          "An independent New York City invention studio creating original products that resolve real-life friction.",
      },
    ],
    links: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/skye_labs-2026logo.svg",
      },
    ],
  }),
  component: Index,
});

function ProductVisualSlot({ product }: { product: StudioProduct }) {
  if (product.heroScreenshot) {
    return (
      <div className="relative h-full min-h-[280px] w-full overflow-hidden bg-secondary">
        <img
          src={product.heroScreenshot.src}
          alt={product.heroScreenshot.alt}
          className="studio-ease h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[280px] w-full flex-col justify-between bg-primary p-8 text-primary-foreground transition-colors duration-300 group-hover:bg-primary/92">
      <div className="flex items-center justify-between gap-4">
        <span className="label-mono text-primary-foreground/65">{product.index}</span>
        <span className="label-mono text-primary-foreground/65">{product.category}</span>
      </div>
      <div>
        <p className="text-3xl font-bold tracking-[-0.03em] md:text-4xl">
          {product.name.toUpperCase()}
        </p>
        <p className="mt-2 label-mono text-primary-foreground/70">{product.platform}</p>
      </div>
    </div>
  );
}

function Index() {
  const flagship = STUDIO_PRODUCTS[0];
  const secondaryProducts = STUDIO_PRODUCTS.filter((p) => p.featured && p.slug !== flagship?.slug);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* ── Above-the-fold Dark Hero ───────────────────────────── */}
      <section
        className="dark relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground"
        style={{ ["--hairline" as string]: "oklch(1 0 0 / 13%)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 z-0 h-[72vh] w-[70vw] max-w-[820px] md:h-[82vh] md:w-[60vw] md:max-w-[900px]"
          style={{
            maskImage:
              "radial-gradient(ellipse 115% 105% at 100% 0%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 32%, rgba(0,0,0,0.4) 58%, rgba(0,0,0,0.12) 80%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 115% 105% at 100% 0%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 32%, rgba(0,0,0,0.4) 58%, rgba(0,0,0,0.12) 80%, rgba(0,0,0,0) 100%)",
          }}
        >
          <video
            className="h-full w-full object-cover opacity-85"
            src="/hero.mp4"
            poster="/hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>

        <div
          aria-hidden="true"
          className="studio-grain pointer-events-none absolute inset-0 z-0 opacity-35"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-6 py-10 md:px-10 md:py-12">
          <div className="flex items-center justify-between gap-4">
            <p className="label-mono text-muted-foreground">New York City</p>
            <p className="label-mono font-bold text-white">Est. 2026</p>
          </div>

          <div className="py-16 md:py-20">
            <h1 className="text-[14vw] leading-[0.86] font-bold tracking-[-0.04em] text-white sm:text-[12vw] md:text-[9.5vw]">
              SKYE_LABS
            </h1>
            <p className="mt-5 label-mono text-muted-foreground md:text-xs">Never Impossible</p>

            <div className="mt-10 max-w-2xl space-y-4">
              <p className="text-xl leading-snug font-semibold tracking-tight text-white md:text-3xl">
                We are a solutions-focused invention studio in New York City, building
                self-sustaining systems that resolve real-life friction.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Explore our featured products below and discover our community-driven vision.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#featured-products"
                className="group studio-ease inline-flex min-h-[44px] items-center gap-3 bg-white px-6 py-3 label-mono text-black transition-all duration-200 hover:bg-white/85"
              >
                <span>Explore Featured Products</span>
                <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              {flagship && (
                <Link
                  to="/products/$slug"
                  params={{ slug: flagship.slug }}
                  className="group studio-ease inline-flex min-h-[44px] items-center gap-3 border border-white/25 px-6 py-3 label-mono text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
                >
                  <span>Explore {flagship.name}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>

          <nav
            className="grid grid-cols-1 border-t border-hairline sm:grid-cols-3"
            aria-label="Primary studio sections"
          >
            {[
              { to: "/vision" as const, label: "Vision", note: "Where we are going" },
              { to: "/products" as const, label: "Products", note: "What we make" },
              { to: "/join-us" as const, label: "Join Us", note: "How to participate" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group studio-ease flex items-center justify-between border-b border-hairline px-1 py-7 transition-colors duration-200 hover:bg-secondary/70 sm:border-r sm:border-b-0 sm:px-6 sm:last:border-r-0"
              >
                <span>
                  <span className="block text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {item.label.toUpperCase()}
                  </span>
                  <span className="mt-2 block label-mono text-muted-foreground">{item.note}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-white transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Featured Products Showcase ─────────────────────────── */}
      <main id="featured-products" className="flex-1 bg-background text-foreground">
        <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col justify-between gap-6 border-b border-hairline pb-8 md:flex-row md:items-end">
            <div>
              <p className="label-mono text-muted-foreground">Featured Products</p>
              <h2 className="mt-4 text-4xl leading-none font-bold tracking-[-0.03em] md:text-6xl">
                WHAT WE ARE BUILDING NOW
              </h2>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 label-mono whitespace-nowrap transition-opacity hover:opacity-70"
            >
              <span>All Products ({STUDIO_PRODUCTS.length})</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {flagship && (
            <div className="grid items-stretch gap-10 border-b border-hairline py-14 md:grid-cols-12 md:gap-12 md:py-20">
              <div className="flex flex-col justify-between md:col-span-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 label-mono text-muted-foreground">
                    <span className="tabular-nums">{flagship.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{flagship.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-foreground">{flagship.status}</span>
                  </div>

                  <h3 className="mt-6 text-4xl leading-[0.98] font-bold tracking-[-0.03em] md:text-5xl">
                    {flagship.name.toUpperCase()}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground">
                    {flagship.tagline}
                  </p>
                  <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                    {flagship.summary}
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    to="/products/$slug"
                    params={{ slug: flagship.slug }}
                    className="group studio-ease inline-flex min-h-[44px] items-center gap-3 bg-primary px-6 py-3 label-mono text-primary-foreground transition-opacity duration-200 hover:opacity-85"
                  >
                    <span>Open Product Page</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  {flagship.liveUrl && (
                    <a
                      href={flagship.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex min-h-[44px] items-center gap-2 border border-ink px-6 py-3 label-mono text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
                    >
                      <span>{flagship.liveCtaLabel ?? "Test Web App"}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <Link
                to="/products/$slug"
                params={{ slug: flagship.slug }}
                className="group relative block overflow-hidden md:col-span-6"
              >
                <ProductVisualSlot product={flagship} />
              </Link>
            </div>
          )}

          {secondaryProducts.length > 0 && (
            <div className="grid gap-12 pt-14 md:grid-cols-2">
              {secondaryProducts.map((product) => (
                <Link
                  key={product.slug}
                  to="/products/$slug"
                  params={{ slug: product.slug }}
                  className="group block border-b border-hairline pb-10 transition-colors duration-200"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ProductVisualSlot product={product} />
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 label-mono text-muted-foreground">
                      <span className="tabular-nums">{product.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.status}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-foreground transition-transform duration-200 group-hover:translate-x-1.5" />
                  </div>

                  <h3 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
                    {product.name.toUpperCase()}
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                    {product.tagline}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── Studio Architecture: Now → Next → Long-Term ────────── */}
        <section className="border-t border-hairline bg-secondary/45">
          <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-24">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="label-mono text-muted-foreground">Studio Architecture</p>
                <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-bold tracking-tight md:text-4xl">
                  Digital apps and web tools today. Physical inventions and community initiatives
                  next.
                </h2>
              </div>
              <Link
                to="/vision"
                className="group inline-flex items-center gap-2 border-b border-ink pb-1 label-mono whitespace-nowrap transition-opacity hover:opacity-70"
              >
                <span>Read the Vision</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {[
                {
                  step: "01",
                  horizon: "Now · Software & Web",
                  title: "Apps & Web Platforms",
                  body: "Designing and shipping focused digital tools like FrameFlow and Script Symphony—open for direct browser use and early testing.",
                },
                {
                  step: "02",
                  horizon: "Next · Objects",
                  title: "Physical Inventions",
                  body: "Expanding into tactile, everyday physical objects engineered with honest materials and brought directly to customers.",
                },
                {
                  step: "03",
                  horizon: "Long-Term · Community",
                  title: "Community & Institutional Initiatives",
                  body: "Channeling product growth into long-term community support, housing stability, and church-connected initiatives.",
                },
              ].map((pillar) => (
                <div key={pillar.step} className="border-t border-ink/25 pt-6">
                  <div className="flex items-center gap-3 label-mono text-muted-foreground">
                    <span className="tabular-nums">{pillar.step}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pillar.horizon}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-tight md:text-2xl">
                    {pillar.title.toUpperCase()}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Signup />
      <Footer />
    </div>
  );
}
