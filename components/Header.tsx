"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/bai-cu", label: "Bài cũ" },
  { href: "/ranking", label: "Xếp hạng" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    const m = document.cookie.match(/(?:^|;\s*)player_name=([^;]*)/);
    setPlayerName(m ? decodeURIComponent(m[1]) : null);
  }, []);

  function handleRename() {
    document.cookie = "player_name=;path=/;max-age=0";
    window.location.reload();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0 text-lg font-bold text-[var(--color-primary)]" onClick={() => setOpen(false)}>
            <Calculator size={24} />
            Web Học Toán 9
          </Link>
          {playerName && (
            <span className="hidden sm:flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
              <span>👋 Xin chào, <span className="font-medium text-[var(--color-text-primary)]">{playerName}</span>!</span>
              <button
                onClick={handleRename}
                className="ml-1 text-xs text-[var(--color-primary)] hover:underline"
              >
                Đổi tên
              </button>
            </span>
          )}
        </div>

        <nav className="hidden sm:flex items-center gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
              }`}
            >
              {label}
            </Link>
          ))}
          <DarkModeToggle />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 sm:hidden">
          {playerName && (
            <div className="flex items-center justify-between px-3 py-2 text-sm">
              <span>👋 <span className="font-medium">{playerName}</span></span>
              <button onClick={handleRename} className="text-xs text-[var(--color-primary)] hover:underline">
                Đổi tên
              </button>
            </div>
          )}
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === href
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
