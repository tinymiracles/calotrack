import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CaloTrack — daily calorie & fitness tracker",
  description: "Track meals, workouts and calories in one place.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15803d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <NavBar />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">{children}</main>
        <footer className="mx-auto w-full max-w-2xl px-4 pb-8 text-center text-xs text-[var(--muted)]">
          Calorie &amp; nutrition values are approximate — for everyday tracking, not medical advice.
        </footer>
      </body>
    </html>
  );
}
