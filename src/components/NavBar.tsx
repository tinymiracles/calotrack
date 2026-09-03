"use client";

import Link from "next/link";
import { clearAllData } from "@/lib/storage";

export default function NavBar() {
  async function handleLogout() {
    const confirmed = window.confirm(
      "Log out and erase everything stored on this device (profile + every logged day)?"
    );
    if (!confirmed) return;
    await clearAllData();
    // Full reload (not router.push) so every page's client-side state,
    // loaded once from localStorage on mount, re-reads the now-empty data.
    window.location.href = "/";
  }

  return (
    <nav
      className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" className="h-7 w-7 rounded-full" />
          Poshan
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
          className="rounded-full p-2 text-[var(--muted)] transition-transform hover:bg-black/5 hover:text-[var(--danger)] active:scale-90"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3" />
            <path d="M16 8l4 4-4 4" />
            <path d="M20 12H9" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
