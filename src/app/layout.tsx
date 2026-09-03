import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import BottomTabBar from "@/components/BottomTabBar";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "CaloTrack — daily calorie & fitness tracker",
  description: "Track meals, workouts and calories in one place.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CaloTrack",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    // Older iOS Safari only recognises the apple-prefixed tag; Next's
    // appleWebApp option alone only emits the newer unprefixed one.
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#15803d",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ServiceWorkerRegister />
        <NavBar />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 pb-24">{children}</main>
        <footer className="mx-auto w-full max-w-2xl px-4 pb-24 text-center text-xs text-[var(--muted)]">
          Calorie &amp; nutrition values are approximate — for everyday tracking, not medical advice.
        </footer>
        <BottomTabBar />
      </body>
    </html>
  );
}
