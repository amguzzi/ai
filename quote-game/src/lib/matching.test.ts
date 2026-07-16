// Minimal sanity tests for the matching contract.
// Run with: npm run test:matching  (uses Node's built-in test runner)
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalize, levenshtein, matchGuess } from "./matching.ts";

test("normalize: lowercase, trim, punctuation, articles", () => {
  assert.equal(normalize("  The Printing-Press! "), "printing press");
  assert.equal(normalize("An APPLE."), "apple");
  assert.equal(normalize("books"), "books");
  assert.equal(normalize("the the movies"), "the movies"); // only ONE leading article dropped
});

test("levenshtein basics", () => {
  assert.equal(levenshtein("books", "books"), 0);
  assert.equal(levenshtein("boks", "books"), 1);
  assert.equal(levenshtein("kitten", "sitting"), 3);
});

test("matchGuess: exact after normalization", () => {
  const r = matchGuess("The Books!", ["books"]);
  assert.equal(r.isCorrect, true);
  assert.equal(r.matchedTerm, "books");
});

test("matchGuess: typo within distance 2", () => {
  const r = matchGuess("comptuers", ["computers"]);
  assert.equal(r.isCorrect, true);
  assert.equal(r.matchedTerm, "computers");
});

test("matchGuess: miss keeps matchedTerm null", () => {
  const r = matchGuess("artificial intelligence", ["books"]);
  assert.equal(r.isCorrect, false);
  assert.equal(r.matchedTerm, null);
  assert.equal(r.normalizedGuess, "artificial intelligence");
});

test("matchGuess: empty guess is a miss, not a fuzzy match", () => {
  const r = matchGuess("  !! ", ["ai"]);
  assert.equal(r.isCorrect, false);
});
