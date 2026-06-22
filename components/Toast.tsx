"use client";

import { useEffect, useState } from "react";

interface Props {
  message: string;
  type?: "info" | "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = "info", onClose, duration = 3000 }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  const colors = {
    info: "border-[var(--color-primary)]",
    success: "border-[var(--color-success)]",
    error: "border-[var(--color-danger)]",
  };

  return (
    <div
      className={`fixed top-20 right-4 z-50 max-w-xs rounded-xl border-l-4 bg-[var(--color-surface)] px-4 py-3 shadow-lg transition-all duration-300 ${
        colors[type]
      } ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
}
