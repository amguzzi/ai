/**
 * An inline redaction over a hidden span. When `revealed` is false, renders
 * an opaque bar sized roughly to the hidden text; when true, shows the text.
 * Uses currentColor so a future theme controls the bar color.
 */
export function RedactionBar({ text, revealed }: { text: string; revealed: boolean }) {
  if (revealed) {
    return <mark data-component="redaction-revealed">{text}</mark>;
  }
  return (
    <span
      data-component="redaction-bar"
      aria-label="redacted"
      style={{
        display: "inline-block",
        backgroundColor: "currentColor",
        borderRadius: 2,
        height: "1em",
        verticalAlign: "text-bottom",
        width: `${Math.max(3, text.length * 0.55)}em`,
      }}
    />
  );
}
