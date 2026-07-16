"use client";

/**
 * Reveals the card's hint (names the domain, never the era).
 * Reveal state is owned by the parent so it resets per card.
 */
export function HintButton({
  hint,
  revealed,
  onReveal,
}: {
  hint: string;
  revealed: boolean;
  onReveal: () => void;
}) {
  if (revealed) {
    return <p data-component="hint-text">Hint: {hint}</p>;
  }
  return (
    <button data-component="hint-button" type="button" onClick={onReveal}>
      Show hint
    </button>
  );
}
