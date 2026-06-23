"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, TriangleAlert, X } from "lucide-react";
import { subscribe, dismiss } from "@/lib/toast";

interface Item {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

const ICONS = {
  success: Check,
  error: X,
  warning: TriangleAlert,
  info: Loader2,
};

const COLORS = {
  success: "border-[var(--color-success)] text-[var(--color-success)]",
  error: "border-[var(--color-danger)] text-[var(--color-danger)]",
  warning: "border-[var(--color-warning)] text-[var(--color-warning)]",
  info: "border-[var(--color-primary)] text-[var(--color-primary)]",
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Item[]>([]);

  useEffect(() => {
    return subscribe(setToasts);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-2">
      {toasts.map((t) => {
        const Icon = ICONS[t.type];
        return (
          <div
            key={t.id}
            className={`flex items-center gap-2 rounded-xl border-l-4 bg-[var(--color-surface)] px-4 py-3 shadow-lg animate-[slideInFromRight_0.3s_ease-out] ${COLORS[t.type]}`}
          >
            <Icon size={16} className={`shrink-0 ${t.type === "info" ? "animate-spin" : ""}`} />
            <p className="text-sm text-[var(--color-text)]">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="ml-2 shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
