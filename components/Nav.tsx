"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Logo, MenuIcon, CloseIcon } from "@/components/ui/icons";

/**
 * Sticky primary navigation.
 *
 * Two pieces of state, both earning their keep:
 *
 *  - `open`  — the mobile disclosure panel.
 *  - `lifted`— whether the page has scrolled past the header. Drives the
 *              backdrop blur and the hairline, so the nav sits flush with the
 *              hero at rest and separates itself once content passes under it.
 *
 * The scroll listener is passive and only calls setState when the boolean
 * actually flips, so it costs one comparison per frame and no re-render.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  /* Close the mobile panel whenever the route changes. Without this, tapping a
     link navigates but leaves the panel covering the page you arrived on. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setLifted((current) => {
        const next = window.scrollY > 12;
        return next === current ? current : next;
      });
    };

    onScroll(); // catches a reload partway down the page
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape closes the panel, and the page behind it stops scrolling. */
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        lifted || open ? "border-b border-line bg-canvas/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 sm:px-8"
      >
        {/* Wordmark ------------------------------------------------------- */}
        <Link
          href="/"
          aria-label={`${site.meta.company} — home`}
          className="group flex items-center gap-2.5 rounded"
        >
          <Logo className="h-6 w-6 text-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5" />
          <span className="font-display text-[0.95rem] font-extrabold tracking-[0.14em] uppercase">
            {site.meta.company}
          </span>
        </Link>

        {/* Desktop links -------------------------------------------------- */}
        <ul className="hidden items-center gap-9 md:flex">
          {site.nav.links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                {/* inline-block + py gives a >=24px hit area (WCAG 2.5.8)
                    without changing the visual rhythm of the nav. */}
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-block rounded py-2 text-sm transition-colors duration-200 ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                  {/* Underline grows from the left on hover, and stays put on
                      the current page. */}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href={site.nav.cta.href}
            className="hidden rounded-lg bg-accent px-5 py-2.5 label text-accent-ink transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-deep hover:shadow-[0_8px_24px_-10px_var(--color-accent)] sm:inline-block"
          >
            {site.nav.cta.label}
          </Link>

          {/* Mobile toggle ------------------------------------------------ */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 rounded p-2 text-ink transition-colors hover:text-accent md:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel ----------------------------------------------------- */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas md:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-4 sm:px-8">
            {site.nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded border-b border-line/60 py-4 text-base transition-colors ${
                    isActive(link.href) ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={site.nav.cta.href}
                className="mt-5 block rounded-lg bg-accent px-5 py-3.5 text-center label text-accent-ink"
              >
                {site.nav.cta.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
