import { parseQuote } from "@/lib/types";
import { RedactionBar } from "./RedactionBar";

/**
 * Renders a quote, with [[redacted]] spans as bars (or revealed text).
 * Attribution is optional so the same component serves guessing (hidden)
 * and reveal (shown) phases.
 */
export function QuoteCard({
  quote,
  revealed,
  attribution,
}: {
  quote: string;
  revealed: boolean;
  attribution?: string;
}) {
  const segments = parseQuote(quote);
  return (
    <figure data-component="quote-card" style={{ margin: 0 }}>
      <blockquote style={{ margin: 0 }}>
        &ldquo;
        {segments.map((seg, i) =>
          seg.type === "text" ? (
            <span key={i}>{seg.text}</span>
          ) : (
            <RedactionBar key={i} text={seg.text} revealed={revealed} />
          )
        )}
        &rdquo;
      </blockquote>
      {attribution ? <figcaption>— {attribution}</figcaption> : null}
    </figure>
  );
}
