"use client";

import { useState } from "react";
import type { Card, GuessRecord } from "@/lib/types";
import { ScoreSummary } from "./ScoreSummary";

export type FunniestMiss = { card: Card; guess: GuessRecord };

export function buildShareText(
  score: number,
  total: number,
  funniestMiss: FunniestMiss | null,
  shareUrl: string | null
): string {
  const lines = [`I identified ${score}/${total} redacted technology quotes.`];
  if (funniestMiss) {
    const { card, guess } = funniestMiss;
    lines.push(
      `I guessed "${guess.rawGuess}" — it was ${card.answer.technology.toLowerCase()} (${card.answer.year}).`
    );
  }
  if (shareUrl) lines.push(shareUrl);
  return lines.join("\n");
}

/**
 * Final shareable result card: score, the funniest miss as the hook,
 * and copy actions for share text + link.
 */
export function ShareCard({
  score,
  total,
  funniestMiss,
  shareUrl,
}: {
  score: number;
  total: number;
  funniestMiss: FunniestMiss | null;
  shareUrl: string | null;
}) {
  const [copied, setCopied] = useState<"text" | "link" | null>(null);
  const shareText = buildShareText(score, total, funniestMiss, shareUrl);

  async function copy(value: string, which: "text" | "link") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard unavailable (permissions/insecure context); the visible
      // text below remains manually selectable.
    }
  }

  return (
    <section data-component="share-card">
      <ScoreSummary score={score} total={total} />
      {funniestMiss ? (
        <p data-component="funniest-miss">
          Best miss: you guessed &ldquo;{funniestMiss.guess.rawGuess}&rdquo; — it was{" "}
          {funniestMiss.card.answer.technology} ({funniestMiss.card.answer.year},{" "}
          {funniestMiss.card.answer.author}).
        </p>
      ) : null}
      <pre data-component="share-text" style={{ whiteSpace: "pre-wrap" }}>
        {shareText}
      </pre>
      <p>
        <button type="button" onClick={() => copy(shareText, "text")}>
          {copied === "text" ? "Copied!" : "Copy result"}
        </button>{" "}
        {shareUrl ? (
          <button type="button" onClick={() => copy(shareUrl, "link")}>
            {copied === "link" ? "Copied!" : "Copy link"}
          </button>
        ) : null}
      </p>
    </section>
  );
}
