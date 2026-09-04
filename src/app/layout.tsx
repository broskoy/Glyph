import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Background from "@/components/Background";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Glyph Visual Arts Culture Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Background />
          <Navigation />
          <main style={{ minHeight: "calc(100vh - 80px)", position: "relative", zIndex: 1, isolation: "isolate" }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
