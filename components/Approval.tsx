import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Human-in-the-loop section.
 *
 * The mock queue is a real <table> rather than a picture of one: it stays
 * readable at any zoom level, costs no image bytes, and screen readers get the
 * actual content. Status is communicated by label text as well as colour, so it
 * survives both greyscale and colour-blind viewing.
 */
export function Approval() {
  const { eyebrow, heading, body, points, queueSample } = site.approval;

  return (
    <Section id="approval" eyebrow={eyebrow} heading={heading} bordered>
      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Copy ----------------------------------------------------------- */}
        <div>
          {body.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-lg text-muted last:mb-0">
              {paragraph}
            </p>
          ))}

          <ul className="mt-10 space-y-6">
            {points.map((point) => (
              <li key={point.title} className="flex gap-4">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <h3 className="text-sm tracking-[0.06em] text-ink">{point.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mock review queue ---------------------------------------------- */}
        <div className="overflow-hidden rounded-lg border border-line bg-surface/50">
          <div className="flex items-center gap-2 border-b border-line bg-surface px-5 py-3.5">
            <span aria-hidden className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            </span>
            <span className="ml-2 font-display text-[0.7rem] font-bold tracking-[0.16em] text-faint uppercase">
              {queueSample.caption}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Example review queue showing four generated artifacts and their approval status.
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-3 font-display text-[0.65rem] font-bold tracking-[0.14em] text-faint uppercase">
                    Artifact
                  </th>
                  <th scope="col" className="px-5 py-3 font-display text-[0.65rem] font-bold tracking-[0.14em] text-faint uppercase">
                    Source
                  </th>
                  <th scope="col" className="px-5 py-3 text-right font-display text-[0.65rem] font-bold tracking-[0.14em] text-faint uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {queueSample.rows.map((row, i) => (
                  <tr key={`${row.artifact}-${i}`} className="border-b border-line/60 last:border-0">
                    <td className="px-5 py-4 whitespace-nowrap text-ink">{row.artifact}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-muted">{row.source}</td>
                    <td className="px-5 py-4 text-right">
                      <StatusPill status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
}

function StatusPill({ status }: { status: "pending" | "approved" }) {
  const isApproved = status === "approved";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-display text-[0.65rem] font-bold tracking-[0.1em] uppercase ${
        isApproved
          ? "border-approved/30 bg-approved/10 text-approved"
          : "border-pending/30 bg-pending/10 text-pending"
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${isApproved ? "bg-approved" : "bg-pending"}`}
      />
      {isApproved ? "Approved" : "Pending"}
    </span>
  );
}
