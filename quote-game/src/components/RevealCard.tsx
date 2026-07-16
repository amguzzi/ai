import type { Card, GuessRecord } from "@/lib/types";
import { QuoteCard } from "./QuoteCard";

/**
 * One step of the post-game reveal: the un-redacted quote, what the player
 * guessed vs. the actual answer, and the reveal blurb. Always shown,
 * hit or miss — the guess-vs-truth contrast is the point.
 */
export function RevealCard({ card, guess }: { card: Card; guess: GuessRecord }) {
  const { answer } = card;
  return (
    <article data-component="reveal-card">
      <QuoteCard
        quote={card.quote}
        revealed
        attribution={`${answer.author}, ${answer.year}, ${answer.source}`}
      />
      <dl>
        <dt>You guessed</dt>
        <dd>&ldquo;{guess.rawGuess}&rdquo;</dd>
        <dt>It was</dt>
        <dd>
          {answer.technology} — {answer.author}, {answer.year}
        </dd>
      </dl>
      <p data-component="reveal-verdict">{guess.isCorrect ? "You got it." : "Fooled."}</p>
      <p data-component="reveal-blurb">{card.revealBlurb}</p>
      <p>
        <a href={answer.sourceUrl} target="_blank" rel="noopener noreferrer">
          Source: {answer.source}
        </a>
      </p>
    </article>
  );
}
