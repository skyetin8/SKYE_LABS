import { useState, type FormEvent } from "react";

interface SignupProps {
  kicker?: string;
  description?: string;
  buttonLabel?: string;
  source?: string;
}

export function Signup({
  kicker = "Stay up to date",
  description = "You don’t want to miss what's coming down the pipeline. Be a part of the mission.",
  buttonLabel = "Join",
  source = "newsletter",
}: SignupProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    try {
      const key = "skye_labs_signups";
      const existingRaw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      const existing: Array<{ email: string; source: string; createdAt: string }> = existingRaw
        ? JSON.parse(existingRaw)
        : [];
      existing.push({
        email: trimmed,
        source,
        createdAt: new Date().toISOString(),
      });
      window.localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      // Safe no-op if storage is unavailable
    }
    setSent(true);
  }

  return (
    <section className="border-t border-hairline">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-20">
        <div>
          <p className="label-mono text-muted-foreground">{kicker}</p>
          <p className="mt-3 max-w-md text-lg leading-snug">{description}</p>
        </div>
        {sent ? (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="label-mono text-foreground">You're on the list: {email.trim()}</p>
            <button
              type="button"
              onClick={() => {
                setEmail("");
                setSent(false);
              }}
              className="label-mono border-b border-ink pb-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              Add another
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <form
              noValidate
              className="flex w-full items-stretch border border-ink"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="you@email.com"
                aria-label="Email address"
                className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="label-mono shrink-0 whitespace-nowrap bg-primary px-6 text-primary-foreground transition-opacity duration-200 hover:opacity-80"
              >
                {buttonLabel}
              </button>
            </form>
            {error && <p className="mt-2 text-xs text-foreground">{error}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
