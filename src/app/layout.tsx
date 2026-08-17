import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Glyph Art Association",
  description: "A creative space for student artists.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <main style={{ minHeight: "calc(100vh - 80px)" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
