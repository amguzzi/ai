import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Redacted",
  description: "Guess the technology behind the redacted quote.",
};

// Deliberately unstyled skeleton: system fonts, no color system, minimal
// layout. A separate design pass owns all visuals.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          maxWidth: "40rem",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        {children}
      </body>
    </html>
  );
}
