import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import InteractiveBackground from "@/components/InteractiveBackground";

export const metadata: Metadata = {
  title: "Glyph Art Association",
  description: "A creative space for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <InteractiveBackground />
        <Navigation />
        <main style={{ minHeight: "calc(100vh - 80px)" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
