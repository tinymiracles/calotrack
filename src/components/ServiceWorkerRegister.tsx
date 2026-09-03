"use client";

import { useEffect } from "react";

/** Registers the service worker that makes CaloTrack installable and
 * gives it basic offline support. No UI — just runs once on mount. */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Installability is a nice-to-have, not load-bearing — fail quietly.
    });
  }, []);

  return null;
}
