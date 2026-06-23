"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const d = document.documentElement.classList.contains("dark");
    setDark(d);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  if (!mounted) return <span className="w-9 h-9" />;

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors hover:bg-[var(--color-border)] shrink-0"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
