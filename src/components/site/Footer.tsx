import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="text-sm font-bold tracking-[0.16em]">SKYE_LABS</p>
          <p className="mt-1 label-mono text-muted-foreground">by SKYE_GROUP · Never Impossible</p>
        </div>
        <nav
          className="flex flex-wrap gap-x-8 gap-y-2 label-mono text-muted-foreground"
          aria-label="Footer navigation"
        >
          <Link to="/vision" className="whitespace-nowrap transition-colors hover:text-foreground">
            Vision
          </Link>
          <Link to="/problem" className="whitespace-nowrap transition-colors hover:text-foreground">
            The Problem
          </Link>
          <Link
            to="/products"
            className="whitespace-nowrap transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link to="/join-us" className="whitespace-nowrap transition-colors hover:text-foreground">
            Join Us
          </Link>
        </nav>
        <p className="label-mono text-muted-foreground">New York City · Est. 2026</p>
      </div>
    </footer>
  );
}
