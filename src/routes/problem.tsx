import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Signup } from "@/components/site/Signup";

export const Route = createFileRoute("/problem")({
  head: () => ({
    meta: [
      { title: "The Problem | SKYE_LABS" },
      {
        name: "description",
        content:
          "The human problems motivating SKYE_LABS: social isolation, housing instability, financial fragility, and community disconnection.",
      },
      { property: "og:title", content: "The Problem | SKYE_LABS" },
      {
        property: "og:description",
        content: "Why SKYE_LABS exists and the real-life friction our systems aim to resolve.",
      },
    ],
  }),
  component: ProblemPage,
});

const issues = [
  {
    code: "01",
    title: "Isolation",
    detail:
      "Modern software keeps people continuously connected on screens while genuine, in-person friendship and neighborhood belonging grow harder to form.",
    direction:
      "Design digital tools whose success is measured offline, helping small cohorts of people meet, gather, and build real community.",
  },
  {
    code: "02",
    title: "Housing & Stability",
    detail:
      "Across major U.S. cities, housing insecurity and homelessness are too often met with slow systems that keep people cycling crisis-to-crisis instead of reaching stability.",
    direction:
      "Over time, direct studio growth toward practical real-estate and supportive restabilization initiatives anchored in New York City.",
  },
  {
    code: "03",
    title: "Financial Fragility",
    detail:
      "Individuals and local institutions often lack resilient, transparent financial support networks when economic pressure hits.",
    direction:
      "Explore simple, trustworthy giving and participation tools that help communities and churches circulate support directly.",
  },
  {
    code: "04",
    title: "Design Exclusion",
    detail:
      "Thoughtful industrial and software design is routinely priced for a narrow luxury tier, leaving everyday life cluttered with disposable tools.",
    direction:
      "Start with accessible, well-crafted products that solve ordinary friction cleanly and fund larger community work.",
  },
];

function ProblemPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-[1400px] px-6 pt-16 pb-16 md:px-10 md:pt-24">
          <p className="label-mono text-muted-foreground">Vision / The Problem</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[0.94] font-bold tracking-[-0.03em] md:text-7xl">
            THE PROBLEM
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We are not interested in merely commenting on social friction. Every product and future
            initiative at SKYE_LABS begins with a concrete human problem worth designing around.
          </p>
        </section>

        <section className="border-t border-hairline">
          {issues.map((item) => (
            <div key={item.code} className="border-b border-hairline">
              <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-14 md:grid-cols-12 md:px-10 md:py-20">
                <p className="label-mono text-muted-foreground tabular-nums md:col-span-2">
                  {item.code}
                </p>
                <div className="md:col-span-5">
                  <h2 className="text-2xl leading-snug font-bold tracking-tight md:text-3xl">
                    {item.title.toUpperCase()}
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="label-mono text-muted-foreground">Practical Direction</p>
                  <p className="mt-4 leading-relaxed text-foreground">{item.direction}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <p className="label-mono text-muted-foreground">Studio Note</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            WHY SKYE_LABS EXISTS
          </h2>
          <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p className="text-foreground">
              Founded in 2026 in New York City by lead designer Tianna Skye, SKYE_LABS is an
              independent Black-owned invention studio built to turn everyday products into fuel for
              self-sustaining community advancement.
            </p>
            <p>
              We start where we can execute right now by shipping digital apps people can test
              today, so that the value created can steadily support physical inventions, a dedicated
              NYC space, and long-term neighborhood and church-connected initiatives.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <Link
              to="/products"
              className="group inline-flex min-h-[44px] items-center gap-3 bg-primary px-6 py-3 label-mono text-primary-foreground transition-opacity duration-200 hover:opacity-85"
            >
              <span>See What We Are Building</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/join-us"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 label-mono text-foreground"
            >
              <span>Join Us</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      <Signup />
      <Footer />
    </div>
  );
}
