import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Signup } from "@/components/site/Signup";
import { ProductTiltCard } from "@/components/site/ProductTiltCard";
import { STUDIO_PRODUCTS, type ProductCategory } from "@/data/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | SKYE_LABS" },
      {
        name: "description",
        content: "Apps, websites, and upcoming inventions from SKYE_LABS in New York City.",
      },
      { property: "og:title", content: "Products | SKYE_LABS" },
      {
        property: "og:description",
        content:
          "Explore FrameFlow, ScriptSymphony, Madam Melody, Glide Departures, Wink Blink Bang Mafia, Pitchify, BurnOut Tracking, and Lazy Llama Health.",
      },
    ],
  }),
  component: ProductsPage,
});

type FilterValue = "All" | ProductCategory;

function ProductsPage() {
  const [filter, setFilter] = useState<FilterValue>("All");

  const filteredProducts =
    filter === "All" ? STUDIO_PRODUCTS : STUDIO_PRODUCTS.filter((item) => item.category === filter);

  const flagship = STUDIO_PRODUCTS[0];
  const categories = (["All", "Web App", "Website", "Physical Invention"] as const).filter(
    (tab) => tab === "All" || STUDIO_PRODUCTS.some((p) => p.category === tab),
  );

  const countFor = (tab: FilterValue) =>
    tab === "All"
      ? STUDIO_PRODUCTS.length
      : STUDIO_PRODUCTS.filter((p) => p.category === tab).length;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* ── Page Hero & Filter Bar ─────────────────────────────── */}
        <section className="mx-auto max-w-[1400px] px-6 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16">
          <p className="label-mono text-muted-foreground">Products / What We Make</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[0.94] font-bold tracking-[-0.03em] md:text-7xl">
            APPS & WEB TOOLS
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            SKYE_LABS builds focused software, websites, and future physical tools. Every product
            has its own dedicated page with screenshots, details, and direct testing links where
            live.
          </p>

          <div
            className="mt-12 flex flex-wrap items-center gap-2 border-t border-hairline pt-8"
            role="tablist"
            aria-label="Filter products by category"
          >
            {categories.map((tab) => {
              const active = filter === tab;
              const label =
                tab === "All"
                  ? "All Releases"
                  : tab === "Physical Invention"
                    ? "Physical"
                    : `${tab}s`;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab)}
                  className={`min-h-[40px] cursor-pointer px-4 py-2 label-mono whitespace-nowrap transition-colors duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "border border-hairline bg-transparent text-muted-foreground hover:border-ink hover:text-foreground"
                  }`}
                >
                  {label} ({countFor(tab)})
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Flagship App Spotlight ─────────────────────────────── */}
        {flagship && (filter === "All" || filter === flagship.category) && (
          <section className="border-t border-hairline bg-secondary/40">
            <div className="mx-auto grid max-w-[1400px] items-stretch gap-10 px-6 py-14 md:grid-cols-12 md:gap-12 md:px-10 md:py-20">
              <div className="flex flex-col justify-between md:col-span-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 label-mono text-muted-foreground">
                    <span>Featured Release</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        flagship.status === "Live Beta"
                          ? "border border-ink/45 px-2 py-0.5 font-medium text-foreground"
                          : "font-medium text-foreground"
                      }
                    >
                      {flagship.status === "Live Beta"
                        ? "Live Beta · Open Testing"
                        : flagship.status}
                    </span>
                  </div>
                  <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                    {flagship.name.toUpperCase()}
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground">
                    {flagship.tagline}
                  </p>
                  <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                    {flagship.problem}
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
                      className="inline-flex min-h-[44px] items-center gap-2 border border-ink px-6 py-3 label-mono text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
                    >
                      <span>{flagship.liveCtaLabel ?? "Launch Web App"}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <Link
                to="/products/$slug"
                params={{ slug: flagship.slug }}
                className="group relative block md:col-span-6"
              >
                <ProductTiltCard product={flagship} variant="flagship" />
              </Link>
            </div>
          </section>
        )}

        {/* ── Full Catalog Index ─────────────────────────────────── */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-[1400px] px-6 py-6 md:px-10">
            <p className="label-mono text-muted-foreground">
              Studio Index · {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "Entry" : "Entries"}
            </p>
          </div>

          {filteredProducts.map((item) => (
            <article key={item.slug} className="border-t border-hairline">
              <Link
                to="/products/$slug"
                params={{ slug: item.slug }}
                className="group block transition-colors duration-200 hover:bg-secondary/50"
              >
                <div className="mx-auto grid max-w-[1400px] items-center gap-6 px-6 py-12 md:grid-cols-12 md:px-10 md:py-14">
                  <p className="label-mono text-muted-foreground tabular-nums md:col-span-2">
                    {item.index}
                  </p>

                  <div className="md:col-span-6">
                    <div className="flex flex-wrap items-center gap-3 label-mono text-muted-foreground">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          item.status === "Live Beta"
                            ? "border border-ink/45 px-2 py-0.5 font-medium text-foreground"
                            : "text-foreground"
                        }
                      >
                        {item.status === "Live Beta" ? "Live Beta · Open Testing" : item.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      {item.logo && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary p-1.5">
                          <img
                            src={item.logo.src}
                            alt={item.logo.alt}
                            className={`h-full w-full object-contain grayscale contrast-125 ${
                              item.logo.blendScreen ? "mix-blend-screen" : ""
                            }`}
                          />
                        </div>
                      )}
                      <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                        {item.name.toUpperCase()}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                      {item.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 md:col-span-4 md:justify-end">
                    <span className="label-mono text-muted-foreground">{item.platform}</span>
                    <span className="inline-flex items-center gap-2 border-b border-ink pb-0.5 label-mono text-foreground">
                      <span>Open</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>

      <Signup />
      <Footer />
    </div>
  );
}
