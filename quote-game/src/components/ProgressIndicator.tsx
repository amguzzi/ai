/** "Card N of M" progress marker. */
export function ProgressIndicator({ current, total }: { current: number; total: number }) {
  return (
    <p data-component="progress-indicator" aria-label={`Card ${current} of ${total}`}>
      {current} / {total}
    </p>
  );
}
