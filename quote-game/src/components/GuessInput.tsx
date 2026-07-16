"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Free-text guess input. Controlled internally; hands the raw string to
 * onSubmit and clears itself. `cardId` resets the field between cards.
 */
export function GuessInput({
  cardId,
  onSubmit,
  disabled,
}: {
  cardId: string;
  onSubmit: (rawGuess: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue("");
    inputRef.current?.focus();
  }, [cardId]);

  return (
    <form
      data-component="guess-input"
      onSubmit={(e) => {
        e.preventDefault();
        const raw = value.trim();
        if (!raw) return;
        onSubmit(raw);
      }}
    >
      <label>
        What technology is this quote about?{" "}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </label>{" "}
      <button type="submit" disabled={disabled || value.trim().length === 0}>
        Submit
      </button>
    </form>
  );
}
