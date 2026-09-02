import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { Logo, MailIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Lockup ---------------------------------------------------------- */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded">
              <Logo className="h-6 w-6 text-accent" />
              <span className="font-display text-[0.95rem] font-extrabold tracking-[0.14em] uppercase">
                {site.meta.company}
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">{site.footer.blurb}</p>

            <a
              href={`mailto:${site.contact.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-accent"
            >
              <MailIcon className="h-4 w-4" />
              {site.contact.email}
            </a>
          </div>

          {/* Link columns ---------------------------------------------------- */}
          {site.footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="label text-faint">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block rounded py-0.5 text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Fine print -------------------------------------------------------- */}
        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-faint">{site.footer.copyright}</p>
          <p className="text-xs text-faint">{site.meta.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
