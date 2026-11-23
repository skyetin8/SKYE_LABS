import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Signup } from "@/components/site/Signup";

export const Route = createFileRoute("/join-us")({
  head: () => ({
    meta: [
      { title: "Join Us — SKYE_LABS" },
      {
        name: "description",
        content:
          "Back Phase One, collaborate, or work with us. Four concrete ways to participate in SKYE_LABS.",
      },
      { property: "og:title", content: "Join Us — SKYE_LABS" },
      {
        property: "og:description",
        content: "Fund, collaborate, build or follow along. Four ways to participate.",
      },
    ],
  }),
  component: JoinPage,
});

const ways = [
  {
    code: "01",
    title: "Fund Phase One",
    body: "Become an early patron of Skye_Labs. Help us launch our inaugural product drops. Momentum happens with you.",
  },
  {
    code: "02",
    title: "Work with us",
    body: "Designers, artists, researchers—Let’s create together. Drop us a line to discuss upcoming projects.",
  },
  {
    code: "03",
    title: "Partner & Share",
    body: "Help us expand our reach. We welcome strategic brand partnerships, media inquiries, and grassroots collaborations.",
  },
  {
    code: "04",
    title: "Follow the Build",
    body: "Never miss a drop. Get behind-the-scenes progress updates and launch announcements right to your inbox.",
  },
];

function JoinPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-[1400px] px-6 pt-16 pb-16 md:px-10 md:pt-24">
          <p className="label-mono text-muted-foreground">Join Us / How to Participate</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[0.94] font-bold tracking-[-0.03em] md:text-7xl">
            BUILD WITH US
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We want to connect with you! Stay in touch as we launch new products and scale our
            community system.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="mailto:Skye.labs.us@gmail.com"
              className="group inline-flex min-h-[44px] items-center gap-3 border-b border-ink pb-2 text-xl font-bold transition-opacity hover:opacity-75"
            >
              <span>Skye.labs.us@gmail.com</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <Link
              to="/products/$slug"
              params={{ slug: "frameflow" }}
              className="group inline-flex min-h-[44px] items-center gap-3 bg-primary px-6 py-3 label-mono text-primary-foreground transition-opacity duration-200 hover:opacity-85"
            >
              <span>Test FrameFlow</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <section className="grid border-t border-hairline sm:grid-cols-2">
          {ways.map((w) => (
            <div
              key={w.code}
              className="border-b border-hairline px-6 py-14 transition-colors duration-200 hover:bg-secondary/40 sm:odd:border-r md:px-10"
            >
              <p className="label-mono text-muted-foreground tabular-nums">{w.code}</p>
              <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
                {w.title.toUpperCase()}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </section>

        {/* ── Honest Patronage / Support Placeholder for Future Donation Flow ── */}
        <section className="border-b border-hairline bg-secondary/35">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-16 md:grid-cols-12 md:items-center md:px-10 md:py-20">
            <div className="md:col-span-7">
              <p className="label-mono text-muted-foreground">Support The Vision</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                HELP US BUILD WHAT COMES NEXT
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                Our charitable and nonprofit structures remain in development. Direct online
                donations are coming soon—in the meantime, reach out directly by email to discuss
                backing Phase One.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:col-span-5 md:justify-end">
              <a
                href="mailto:Skye.labs.us@gmail.com?subject=Supporting%20SKYE_LABS%20Phase%20One"
                className="group inline-flex min-h-[44px] items-center gap-3 border border-ink px-6 py-3 label-mono text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                <span>Inquire About Backing</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <span className="label-mono text-muted-foreground">Donate — Coming Soon</span>
            </div>
          </div>
        </section>
      </main>
      <Signup />
      <Footer />
    </div>
  );
}
