/** Final score line: X of N correct (and how many quotes fooled the player). */
export function ScoreSummary({ score, total }: { score: number; total: number }) {
  const fooled = total - score;
  return (
    <div data-component="score-summary">
      <p>
        <strong>
          {score} / {total}
        </strong>{" "}
        correct
      </p>
      <p>
        {fooled === 0
          ? "Nothing got past you."
          : `${fooled} quote${fooled === 1 ? "" : "s"} fooled you.`}
      </p>
    </div>
  );
}
