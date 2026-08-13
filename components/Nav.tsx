"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Logo, MenuIcon, CloseIcon } from "@/components/ui/icons";

/**
 * Sticky anchor navigation.
 *
 * This is a client component only because of the mobile disclosure panel. The
 * markup is otherwise static — no scroll listeners, no active-section tracking,
 * no intersection observers. Those cost main-thread work on every scroll frame
 * and buy very little on a page this short.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  /* Close on Escape, and stop the page scrolling behind the open panel. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-base/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 sm:px-8"
      >
        {/* Wordmark ------------------------------------------------------- */}
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded transition-opacity hover:opacity-80"
        >
          <Logo className="h-6 w-6 text-accent" />
          <span className="font-display text-base font-black tracking-[0.1em] uppercase">
            {site.meta.company}
          </span>
          <span className="sr-only">— back to top</span>
        </a>

        {/* Desktop links -------------------------------------------------- */}
        <ul className="hidden items-center gap-8 lg:flex">
          {site.nav.links.map((link) => (
            <li key={link.href}>
              {/* inline-block + py gives a ≥24px hit area (WCAG 2.5.8)
                  without changing the visual rhythm of the nav. */}
              <a
                href={link.href}
                className="inline-block rounded py-2 text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={site.nav.cta.href}
            className="hidden rounded bg-accent px-5 py-2.5 font-display text-xs font-extrabold tracking-[0.08em] text-accent-ink uppercase transition-colors hover:bg-accent-deep sm:inline-block"
          >
            {site.nav.cta.label}
          </a>

          {/* Mobile toggle ------------------------------------------------ */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 rounded p-2 text-ink transition-colors hover:text-accent lg:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel ----------------------------------------------------- */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-base lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-6 py-4 sm:px-8">
            {site.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded border-b border-line/60 py-3.5 text-base text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.nav.cta.href}
                onClick={() => setOpen(false)}
                className="mt-4 block rounded bg-accent px-5 py-3 text-center font-display text-sm font-extrabold tracking-[0.08em] text-accent-ink uppercase"
              >
                {site.nav.cta.label}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
