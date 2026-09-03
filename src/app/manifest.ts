import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Poshan — daily calorie & fitness tracker",
    short_name: "Poshan",
    description: "Log meals and workouts, see calories in vs. burned, and track your goal.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f8f6",
    theme_color: "#51652f",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
