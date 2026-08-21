import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import InteractiveBackground from "@/components/InteractiveBackground";
import UserMenu from "@/components/UserMenu";
import Providers from "@/components/Providers";

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
        <Providers>
          <InteractiveBackground />
          <Navigation />
          <UserMenu />
          <main style={{ minHeight: "calc(100vh - 80px)", position: "relative", zIndex: 1, isolation: "isolate" }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
