import { site } from "@/content/site";
import { Logo } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Lockup ---------------------------------------------------------- */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo className="h-6 w-6 text-accent" />
              <span className="font-display text-base font-black tracking-[0.1em] uppercase">
                {site.meta.company}
              </span>
            </div>
            <p className="mt-2 font-display text-[0.7rem] font-bold tracking-[0.18em] text-faint uppercase">
              {site.meta.tagline}
            </p>
            <p className="mt-6 text-sm text-muted">{site.footer.blurb}</p>
          </div>

          {/* Links ----------------------------------------------------------- */}
          <nav aria-label="Footer" className="md:justify-self-end">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3">
              {site.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block rounded py-1 text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-block rounded py-1 text-sm text-muted transition-colors hover:text-ink"
                >
                  Email us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Fine print -------------------------------------------------------- */}
        <div className="mt-14 border-t border-line pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-faint">
            {site.footer.fineprint}
          </p>
          <p className="mt-4 text-xs text-faint">{site.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
