import { site } from "@/content/site";
import { Container, ButtonLink } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <div className="max-w-xl">
        <p className="tabular label text-accent">404</p>
        <h1 className="mt-5 text-[2.125rem] sm:text-[3rem]">{site.notFound.heading}</h1>
        <p className="mt-6 text-lg text-muted">{site.notFound.body}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={site.notFound.cta.href}>
            {site.notFound.cta.label}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
