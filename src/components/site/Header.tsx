import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/vision" as const, label: "Vision" },
  { to: "/products" as const, label: "Products" },
  { to: "/join-us" as const, label: "Join Us" },
];

export function Header({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-hairline bg-background/95 text-foreground backdrop-blur-sm ${
        theme === "dark" ? "dark" : ""
      }`}
      style={theme === "dark" ? { ["--hairline" as string]: "oklch(1 0 0 / 14%)" } : undefined}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-8 px-6 md:px-10">
        <Link
          to="/"
          className="shrink-0 whitespace-nowrap text-sm font-bold tracking-[0.16em] text-foreground transition-opacity duration-200 hover:opacity-70"
        >
          SKYE_LABS
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="label-mono relative shrink-0 whitespace-nowrap py-1 text-muted-foreground transition-colors duration-200 hover:text-foreground [&.active]:text-foreground [&.active]:underline [&.active]:underline-offset-8"
              activeProps={{ className: "active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/products/$slug"
            params={{ slug: "frameflow" }}
            className="hidden shrink-0 whitespace-nowrap border border-ink bg-primary px-4 py-2 label-mono text-primary-foreground transition-colors duration-200 hover:bg-transparent hover:text-foreground sm:inline-flex"
          >
            Test FrameFlow
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center border border-hairline text-foreground transition-colors duration-200 hover:border-ink md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-hairline bg-background px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center justify-between border-b border-hairline py-2 text-lg font-bold tracking-tight text-foreground"
              >
                <span>{item.label.toUpperCase()}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
            <Link
              to="/products/$slug"
              params={{ slug: "frameflow" }}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center bg-primary px-4 py-3 label-mono text-primary-foreground"
            >
              Test FrameFlow
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
