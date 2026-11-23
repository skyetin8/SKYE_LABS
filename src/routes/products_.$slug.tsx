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
      product?.tagline ?? "Explore digital apps, websites, and inventions from SKYE_LABS.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
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
      <Header />

      <main className="flex-1">
        {/* ── Breadcrumb + Hero Split ────────────────────────────── */}
        <section className="mx-auto max-w-[1400px] px-6 pt-12 pb-16 md:px-10 md:pt-16 md:pb-24">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 label-mono text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Products / {product.category}</span>
          </Link>

          <div className="mt-10 grid items-stretch gap-10 md:grid-cols-12 md:gap-12">
            <div className="flex flex-col justify-between md:col-span-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 label-mono text-muted-foreground">
                  <span className="tabular-nums">{product.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.platform}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-foreground">{product.status}</span>
                </div>

                <h1 className="mt-6 text-5xl leading-[0.94] font-bold tracking-[-0.03em] md:text-7xl">
                  {product.name.toUpperCase()}
                </h1>
                <p className="mt-6 max-w-xl text-xl leading-snug font-medium text-foreground">
                  {product.tagline}
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  {product.summary}
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                {product.liveUrl ? (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex min-h-[44px] items-center gap-3 bg-primary px-6 py-3 label-mono text-primary-foreground transition-opacity duration-200 hover:opacity-85"
                  >
                    <span>{product.liveCtaLabel ?? `Open ${product.name}`}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <a
                    href="#test-access"
                    className="group inline-flex min-h-[44px] items-center gap-3 bg-primary px-6 py-3 label-mono text-primary-foreground transition-opacity duration-200 hover:opacity-85"
                  >
                    <span>{product.liveCtaLabel ?? "Request Testing Access"}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                )}

                <Link
                  to="/join-us"
                  className="inline-flex min-h-[44px] items-center border border-ink px-6 py-3 label-mono text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
                >
                  Follow Build Updates
                </Link>
              </div>
            </div>

            <div className="md:col-span-6">
              {product.heroScreenshot ? (
                <div className="group relative h-full min-h-[320px] overflow-hidden bg-secondary">
                  <img
                    src={product.heroScreenshot.src}
                    alt={product.heroScreenshot.alt}
                    className="studio-ease h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div className="flex h-full min-h-[320px] flex-col justify-between bg-primary p-10 text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-primary-foreground/65">{product.index}</span>
                    <span className="label-mono text-primary-foreground/65">
                      {product.category}
                    </span>
                  </div>
                  <div>
                    <p className="text-4xl font-bold tracking-tight md:text-5xl">
                      {product.name.toUpperCase()}
                    </p>
                    <p className="mt-3 label-mono text-primary-foreground/75">{product.platform}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Problem & Design Approach ──────────────────────────── */}
        <section className="border-t border-hairline bg-secondary/40">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
            <div className="md:col-span-6">
              <p className="label-mono text-muted-foreground">The Friction</p>
              <h2 className="mt-4 text-2xl leading-snug font-bold tracking-tight md:text-3xl">
                {product.problem}
              </h2>
            </div>
            <div className="md:col-span-6">
              <p className="label-mono text-muted-foreground">Design Direction</p>
              <p className="mt-4 text-lg leading-relaxed text-foreground">{product.approach}</p>
            </div>
          </div>
        </section>

        {/* ── Real Screenshots Gallery (Rendered when screenshots exist) */}
        {product.screenshots && product.screenshots.length > 0 && (
          <section className="border-t border-hairline">
            <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
              <p className="label-mono text-muted-foreground">Interface & Preview</p>
              <div className="mt-10 grid gap-10 md:grid-cols-2">
                {product.screenshots.map((shot) => (
                  <figure key={shot.src}>
                    <div className="overflow-hidden bg-secondary">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        className="w-full object-cover grayscale transition-transform duration-300 hover:scale-[1.01]"
                      />
                    </div>
                    {shot.caption && (
                      <figcaption className="mt-3 label-mono text-muted-foreground">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── How It Works ───────────────────────────────────────── */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
            <p className="label-mono text-muted-foreground">How It Works</p>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {product.howItWorks.map((step) => (
                <div key={step.step} className="border-t border-ink/25 pt-6">
                  <p className="label-mono text-muted-foreground tabular-nums">{step.step}</p>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight">
                    {step.title.toUpperCase()}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Capabilities & Release Sheet ───────────────────────── */}
        <section className="border-t border-hairline">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
            <div className="md:col-span-7">
              <p className="label-mono text-muted-foreground">Capabilities</p>
              <div className="mt-8 divide-y divide-hairline border-t border-b border-hairline">
                {product.capabilities.map((cap) => (
                  <div key={cap.title} className="py-6">
                    <h3 className="text-xl font-bold tracking-tight">{cap.title}</h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                      {cap.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <p className="label-mono text-muted-foreground">Release Sheet</p>
              <dl className="mt-8 divide-y divide-hairline border-t border-b border-hairline">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between gap-4 py-4">
                    <dt className="label-mono text-muted-foreground">{spec.label}</dt>
                    <dd className="text-sm font-medium text-foreground tabular-nums">
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
