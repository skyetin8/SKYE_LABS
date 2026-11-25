import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Signup } from "@/components/site/Signup";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Vision | SKYE_LABS" },
      {
        name: "description",
        content:
          "How SKYE_LABS moves from digital apps and inventions today toward lasting community, housing, and institutional work.",
      },
      { property: "og:title", content: "Vision | SKYE_LABS" },
      {
        property: "og:description",
        content: "Digital Products → Physical Inventions → Community Infrastructure.",
      },
    ],
  }),
  component: VisionPage,
});

const horizons = [
  {
    id: "01",
    horizon: "Phase One · Active Now",
    title: "Digital Products & Web Apps",
    body: "SKYE_LABS begins by building and shipping focused software and web tools. Rather than raising hype around decks, we put working apps directly into people's hands, test them in real life, and let honest utility establish the studio.",
    points: [
      "Browser-first apps and websites open for direct testing",
      "Direct user feedback shaping every release",
      "Built independently in New York City",
    ],
  },
  {
    id: "02",
    horizon: "Phase Two · Next",
    title: "Physical Inventions",
    body: "As our digital products build momentum, we aim to expand into tactile, small-batch physical objects designed for everyday utility, resolving ordinary domestic and personal friction with honest materials.",
    points: [
      "Everyday physical inventions in early research",
      "Direct-to-consumer & preorder launch model",
      "Built to last, never disposable",
    ],
  },
  {
    id: "03",
    horizon: "Phase Three · Long-Term",
    title: "Community & Institutional Initiatives",
    body: "Our long-term ambition extends beyond products. Over time, we hope to channel studio revenue into future nonprofit and real-estate initiatives supporting housing stability, neighborhood institutions, and church-connected community work.",
    points: [
      "Supportive housing & community stabilization goals",
      "Church & neighborhood institutional partnerships",
      "Long-term social architecture funded by studio growth",
    ],
  },
];

const progression = [
  "We identify real-life friction.",
  "We design a practical digital or physical tool.",
  "People adopt and test it directly.",
  "Value created funds the next phase of the studio.",
  "Growth expands our capacity to build lasting community work.",
];

function VisionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-[1400px] px-6 pt-16 pb-16 md:px-10 md:pt-24 md:pb-24">
          <p className="label-mono text-muted-foreground">Vision / Where We Are Going</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[0.94] font-bold tracking-[-0.03em] md:text-7xl">
            PRODUCTS → TECHNOLOGY → COMMUNITY
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every stage earns the next. We start by shipping useful digital apps and web tools
            today, expand into physical inventions, and reinvest long-term into community
            initiatives.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/problem"
              className="group inline-flex min-h-[44px] items-center gap-3 bg-primary px-6 py-3 label-mono text-primary-foreground transition-opacity duration-200 hover:opacity-85"
            >
              <span>Read The Problem</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/products"
              className="group inline-flex min-h-[44px] items-center gap-2 border-b border-ink pb-1 label-mono text-foreground"
            >
              <span>Explore Current Products</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* ── Three Horizons ─────────────────────────────────────── */}
        <section className="border-t border-hairline">
          {horizons.map((phase) => (
            <div key={phase.id} className="border-b border-hairline">
              <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
                <p className="label-mono text-muted-foreground tabular-nums md:col-span-3">
                  {phase.id} / {phase.horizon}
                </p>
                <div className="md:col-span-5">
                  <h2 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl">
                    {phase.title.toUpperCase()}
                  </h2>
                  <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">
                    {phase.body}
                  </p>
                </div>
                <ul className="space-y-3 md:col-span-4">
                  {phase.points.map((point) => (
                    <li
                      key={point}
                      className="border-t border-hairline pt-3 text-sm leading-snug text-foreground"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* ── The Self-Sustaining Model ──────────────────────────── */}
        <section className="bg-secondary/40">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
            <div className="md:col-span-5">
              <p className="label-mono text-muted-foreground">The Model</p>
              <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight md:text-4xl">
                SELF-SUSTAINING BY DESIGN.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                We are building SKYE_LABS from the ground up, not as a finished corporation
                pretending to be bigger than it is, but as an independent studio committed to
                earning its impact one real product at a time.
              </p>
              <Link
                to="/join-us"
                className="group mt-8 inline-flex items-center gap-3 border-b border-ink pb-1 label-mono text-foreground"
              >
                <span>Build With Us</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <ol className="divide-y divide-hairline border-t border-b border-hairline md:col-span-7">
              {progression.map((line, idx) => (
                <li key={line} className="flex items-baseline gap-6 py-5">
                  <span className="label-mono text-muted-foreground tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-medium tracking-tight md:text-xl">{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <Signup />
      <Footer />
    </div>
  );
}
