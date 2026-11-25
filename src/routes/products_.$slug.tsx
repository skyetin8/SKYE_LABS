import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Signup } from "@/components/site/Signup";
import { getProductBySlug, STUDIO_PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/products_/$slug")({
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    const title = product ? `${product.name} — SKYE_LABS` : "Product Not Found — SKYE_LABS";
    const description =
      product?.seoDescription ??
      product?.tagline ??
      "Explore digital apps, websites, and inventions from SKYE_LABS.";
    const jsonLd = product
      ? JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          applicationCategory:
            product.slug === "frameflow"
              ? "MultimediaApplication"
              : product.category === "Website"
                ? "WebApplication"
                : "SoftwareApplication",
          operatingSystem: "Web Browser",
          description,
          url: product.liveUrl ?? `https://skyelabs.us/products/${product.slug}`,
          creator: {
            "@type": "Organization",
            name: "SKYE_LABS",
          },
          featureList: product.capabilities.map((c) => `${c.title}: ${c.detail}`),
        })
      : null;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      ...(jsonLd
        ? {
            scripts: [
              {
                type: "application/ld+json",
                children: jsonLd,
              },
            ],
          }
        : {}),
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 py-24 md:px-10">
          <p className="label-mono text-muted-foreground">Products / 404</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">PRODUCT NOT FOUND</h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            This release isn’t listed yet. Return to the studio index to see what is currently in
            testing and development.
          </p>
          <div className="mt-8">
            <Link
              to="/products"
              className="group inline-flex min-h-[44px] items-center gap-3 bg-primary px-6 py-3 label-mono text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Products</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const otherProducts = STUDIO_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header theme="dark" />

      <main className="flex-1">
        {/* ── Immersive Dark Product Portal ───────────────────────── */}
        <section
          className="dark relative overflow-hidden bg-background text-foreground"
          style={{ ["--hairline" as string]: "oklch(1 0 0 / 14%)" }}
        >
          <div
            aria-hidden="true"
            className="studio-grain pointer-events-none absolute inset-0 z-0 opacity-30"
          />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-10 pb-16 md:px-10 md:pt-14 md:pb-24">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 label-mono text-muted-foreground transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Products / {product.category}</span>
            </Link>

            <div className="mt-8 flex flex-col justify-between gap-8 border-b border-hairline pb-10 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 label-mono text-muted-foreground">
                  <span className="tabular-nums">{product.index}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white">{product.status}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.platform}</span>
                </div>

                <div className="mt-5 flex items-center gap-5 md:gap-6">
                  {product.logo && (
                    <img
                      src={product.logo.src}
                      alt={product.logo.alt}
                      draggable={false}
                      className={`h-16 w-16 shrink-0 object-contain select-none sm:h-20 sm:w-20 md:h-24 md:w-24 ${
                        product.logo.blendScreen ? "mix-blend-screen" : ""
                      }`}
                    />
                  )}
                  <h1 className="text-5xl leading-[0.92] font-bold tracking-[-0.035em] text-white md:text-7xl">
                    {product.name.toUpperCase()}
                  </h1>
                </div>

                {product.liveUrl && (
                  <div className="mt-4 inline-flex items-center gap-3">
                    <span
                      className="relative flex h-4 w-4 items-center justify-center"
                      aria-hidden="true"
                    >
                      <span
                        className="absolute h-4 w-4 animate-ping rounded-full opacity-40 [animation-duration:2.2s]"
                        style={{ backgroundColor: product.accentColor ?? "#00ABD3" }}
                      />
                      <span
                        className="absolute h-3 w-3 animate-pulse rounded-full border opacity-60"
                        style={{ borderColor: product.accentColor ?? "#00ABD3" }}
                      />
                      <span
                        className="relative h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: product.accentColor ?? "#00ABD3" }}
                      />
                    </span>
                    <span className="label-mono text-white/90">
                      {product.status === "In Beta" ? "Live Beta" : "Live Now"}
                    </span>
                  </div>
                )}

                <p className="mt-4 max-w-2xl text-lg leading-snug text-white/80 md:text-2xl">
                  {product.tagline}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3">
                {product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group studio-ease inline-flex min-h-[48px] items-center gap-3 bg-white px-7 py-3.5 label-mono whitespace-nowrap text-black transition-all duration-200 hover:bg-white/85"
                  >
                    <span>{product.liveCtaLabel ?? `Launch ${product.name}`}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <a
                    href="#test-access"
                    className="group studio-ease inline-flex min-h-[48px] items-center gap-3 bg-white px-7 py-3.5 label-mono whitespace-nowrap text-black transition-all duration-200 hover:bg-white/85"
                  >
                    <span>{product.liveCtaLabel ?? "Request Testing Access"}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                )}

                <a
                  href="#test-access"
                  className="inline-flex min-h-[48px] items-center border border-white/25 px-6 py-3.5 label-mono whitespace-nowrap text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
                >
                  Follow Updates
                </a>
              </div>
            </div>

            {/* ── Dominant Full-Width Interactive Preview Stage ───── */}
            {product.heroScreenshots && product.heroScreenshots.length > 0 ? (
              <div className="mt-10 md:mt-12">
                {product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    draggable={false}
                    className="group relative block overflow-hidden bg-black select-none focus:outline-none"
                  >
                    <div className="grid grid-cols-3 items-center gap-2 px-2 py-6 sm:gap-5 sm:px-6 md:gap-8 md:px-10 md:py-10">
                      {product.heroScreenshots.map((shot, idx) => (
                        <div
                          key={shot.src}
                          className={`flex items-center justify-center transition-transform duration-500 ${
                            idx === 1
                              ? "z-10 scale-[1.03] group-hover:scale-[1.05]"
                              : "opacity-95 group-hover:opacity-100"
                          }`}
                        >
                          <img
                            src={shot.src}
                            alt={shot.alt}
                            draggable={false}
                            className="studio-ease max-h-[260px] w-full object-contain select-none sm:max-h-[420px] md:max-h-[540px]"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 bg-gradient-to-t from-black/90 via-black/35 to-transparent px-5 pt-16 pb-5 md:px-8">
                      <p className="max-w-lg text-sm leading-snug text-white/85">
                        {product.heroScreenshot?.caption}
                      </p>
                      <span className="shrink-0 bg-white px-5 py-2.5 label-mono text-black transition-all duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
                        Try Now
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="relative overflow-hidden bg-black select-none">
                    <div className="grid grid-cols-3 items-center gap-2 px-2 py-6 pb-16 sm:gap-5 sm:px-6 md:gap-8 md:px-10 md:py-10 md:pb-20">
                      {product.heroScreenshots.map((shot, idx) => (
                        <div
                          key={shot.src}
                          className={`flex items-center justify-center ${
                            idx === 1 ? "z-10 scale-[1.03]" : "opacity-95"
                          }`}
                        >
                          <img
                            src={shot.src}
                            alt={shot.alt}
                            draggable={false}
                            className="max-h-[260px] w-full object-contain select-none sm:max-h-[420px] md:max-h-[540px]"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-black/95 via-black/45 to-transparent px-5 pt-16 pb-5 md:px-8">
                      <p className="max-w-xl text-sm leading-snug text-white/85">
                        {product.heroScreenshot?.caption ??
                          "Early concept preview — currently in development."}
                      </p>
                      <span className="shrink-0 border border-white/25 bg-black/70 px-4 py-2 label-mono text-white/90">
                        Concept Only · Not Live
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : product.heroScreenshot ? (
              <div className="mt-10 md:mt-12">
                {product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    draggable={false}
                    className="group relative block bg-black select-none focus:outline-none"
                  >
                    <div
                      className={`relative w-full overflow-hidden bg-black ${
                        product.heroScreenshot.orientation === "portrait"
                          ? "flex h-[520px] items-center justify-center py-4 md:h-[600px]"
                          : "aspect-[16/9]"
                      }`}
                    >
                      <img
                        src={product.heroScreenshot.src}
                        alt={product.heroScreenshot.alt}
                        draggable={false}
                        className={`studio-ease object-contain grayscale-[35%] select-none transition-all duration-500 group-hover:scale-[1.01] group-hover:grayscale-0 ${
                          product.heroScreenshot.orientation === "portrait"
                            ? "h-full w-auto max-w-full"
                            : "h-full w-full"
                        }`}
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-5 pt-16 pb-5 md:px-8">
                        <p className="max-w-lg text-sm leading-snug text-white/85">
                          {product.heroScreenshot.caption}
                        </p>
                        <span className="shrink-0 bg-white px-5 py-2.5 label-mono text-black transition-all duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
                          Try Now
                        </span>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div
                    className={`bg-black select-none ${
                      product.heroScreenshot.orientation === "portrait"
                        ? "flex h-[520px] items-center justify-center py-4 md:h-[600px]"
                        : ""
                    }`}
                  >
                    <img
                      src={product.heroScreenshot.src}
                      alt={product.heroScreenshot.alt}
                      draggable={false}
                      className={`object-contain grayscale select-none ${
                        product.heroScreenshot.orientation === "portrait"
                          ? "h-full w-auto max-w-full"
                          : "aspect-[16/9] w-full"
                      }`}
                    />
                  </div>
                )}
              </div>
            ) : product.liveUrl ? (
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noreferrer"
                draggable={false}
                className="group relative mt-10 flex min-h-[340px] flex-col justify-between bg-black p-8 transition-colors duration-300 select-none hover:bg-black/80 focus:outline-none md:mt-12 md:min-h-[420px] md:p-12"
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono text-muted-foreground">{product.index}</span>
                  <span className="label-mono text-muted-foreground">{product.category}</span>
                </div>
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                      {product.name.toUpperCase()}
                    </p>
                    <p className="mt-3 label-mono text-muted-foreground">{product.platform}</p>
                  </div>
                  <span className="w-fit shrink-0 bg-white px-5 py-2.5 label-mono text-black transition-all duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
                    Try Now
                  </span>
                </div>
              </a>
            ) : (
              <div className="mt-10 flex min-h-[340px] flex-col justify-between bg-black p-8 select-none md:mt-12 md:min-h-[420px] md:p-12">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-muted-foreground">{product.index}</span>
                  <span className="label-mono text-muted-foreground">{product.category}</span>
                </div>
                <div>
                  <p className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                    {product.name.toUpperCase()}
                  </p>
                  <p className="mt-3 label-mono text-muted-foreground">{product.platform}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Concise Thesis & 3-Step Flow ───────────────────────── */}
        <section className="border-t border-hairline bg-background">
          <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
            <div className="grid gap-10 border-b border-hairline pb-14 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="label-mono text-muted-foreground">Why It Exists</p>
                <h2 className="mt-4 max-w-2xl text-2xl leading-snug font-bold tracking-tight md:text-4xl">
                  {product.problem}
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="leading-relaxed text-muted-foreground">{product.summary}</p>
              </div>
            </div>

            <div className="grid gap-8 pt-12 md:grid-cols-3 md:gap-10">
              {product.howItWorks.map((step) => (
                <div key={step.step} className="border-t border-ink/25 pt-5">
                  <p className="label-mono text-muted-foreground tabular-nums">{step.step}</p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">
                    {step.title.toUpperCase()}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Show, Don't Tell: Workflow Spotlights ──────────────── */}
        {product.screenshots && product.screenshots.length > 0 && (
          <section className="border-t border-hairline bg-secondary/35">
            <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p className="label-mono text-muted-foreground">
                  {product.previewSectionLabel ?? "Inside The Workspace"}
                </p>
                <p className="label-mono text-muted-foreground">Hover frames to inspect color UI</p>
              </div>

              <div
                className={`mt-10 grid gap-8 md:gap-10 ${
                  product.screenshots.every((s) => s.orientation === "portrait") &&
                  product.screenshots.length >= 4
                    ? "sm:grid-cols-2 lg:grid-cols-4"
                    : "md:grid-cols-2"
                }`}
              >
                {product.screenshots.map((shot) => {
                  const isPortrait = shot.orientation === "portrait";
                  return (
                    <figure key={shot.src} className="flex flex-col">
                      <div
                        className={`overflow-hidden bg-black select-none ${
                          isPortrait
                            ? "flex h-[460px] items-center justify-center p-4"
                            : "aspect-[16/9]"
                        }`}
                      >
                        <img
                          src={shot.src}
                          alt={shot.alt}
                          draggable={false}
                          className={`studio-ease grayscale select-none transition-all duration-300 hover:grayscale-0 ${
                            isPortrait
                              ? "h-full w-auto max-w-full object-contain"
                              : "h-full w-full object-contain hover:scale-[1.01]"
                          }`}
                        />
                      </div>
                      <figcaption className="mt-4">
                        {shot.title && (
                          <p className="text-base font-bold tracking-tight text-foreground">
                            {shot.title}
                          </p>
                        )}
                        {shot.caption && (
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {shot.caption}
                          </p>
                        )}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Scannable Capabilities & Technical Sheet ───────────── */}
        <section className="border-t border-hairline">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
            <div className="md:col-span-7">
              <p className="label-mono text-muted-foreground">Capabilities</p>
              <div className="mt-6 divide-y divide-hairline border-t border-b border-hairline">
                {product.capabilities.map((cap) => (
                  <div
                    key={cap.title}
                    className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                  >
                    <h3 className="text-base font-bold tracking-tight sm:col-span-5">
                      {cap.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-7">
                      {cap.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <p className="label-mono text-muted-foreground">Release Sheet</p>
              <dl className="mt-6 divide-y divide-hairline border-t border-b border-hairline">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-6 py-3.5"
                  >
                    <dt className="shrink-0 label-mono text-muted-foreground">{spec.label}</dt>
                    <dd className="text-right text-sm font-medium text-foreground tabular-nums">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Product-Specific Testing / Early Access Form ───────── */}
        <div id="test-access">
          <Signup
            kicker={`${product.name} · ${product.status}`}
            description={`Leave your email for testing links, mobile release updates (iOS & Android), and notes on ${product.name}.`}
            buttonLabel="Join"
            source={`product:${product.slug}`}
          />
        </div>

        {/* ── Continue Exploring Other Products ──────────────────── */}
        {otherProducts.length > 0 && (
          <section className="border-t border-hairline bg-secondary/35">
            <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
              <div className="flex items-center justify-between">
                <p className="label-mono text-muted-foreground">More From SKYE_LABS</p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 border-b border-ink pb-0.5 label-mono"
                >
                  <span>All Products</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {otherProducts.map((other) => (
                  <Link
                    key={other.slug}
                    to="/products/$slug"
                    params={{ slug: other.slug }}
                    className="group flex items-start justify-between gap-6 border-t border-hairline pt-6 transition-opacity hover:opacity-75"
                  >
                    <div>
                      <p className="label-mono text-muted-foreground">
                        {other.index} · {other.category} · {other.status}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold tracking-tight">
                        {other.name.toUpperCase()}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                        {other.tagline}
                      </p>
                    </div>
                    <ArrowRight className="mt-2 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
