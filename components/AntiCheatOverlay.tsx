"use client";

import { useEffect, useRef, useState } from "react";
import { TriangleAlert } from "lucide-react";

interface Props {
  flags: string[];
}

const FLAG_LABELS: Record<string, string> = {
  fast_submit: "Nộp bài quá nhanh",
  tab_leave: "Rời khỏi tab làm bài",
  copy_paste: "Sao chép trong lúc làm",
  mouse_leave: "Chuột rời khỏi vùng làm bài",
};

export default function AntiCheatOverlay({ flags }: Props) {
  const [show, setShow] = useState(false);
  const [currentFlag, setCurrentFlag] = useState<string | null>(null);
  const prevFlags = useRef<string[]>([]);

  useEffect(() => {
    const newFlags = flags.filter((f) => !prevFlags.current.includes(f));
    if (newFlags.length > 0) {
      setCurrentFlag(newFlags[newFlags.length - 1]);
      setShow(true);
      const t = setTimeout(() => setShow(false), 3000);
      prevFlags.current = flags;
      return () => clearTimeout(t);
    }
    prevFlags.current = flags;
  }, [flags]);

  if (!show || !currentFlag) return null;

  return (
    <div className="fixed top-20 left-1/2 z-40 -translate-x-1/2 animate-[shake_0.5s_ease-in-out]">
      <div className="flex items-center gap-2 rounded-xl border-2 border-[var(--color-danger)] bg-[var(--color-danger)]/10 px-5 py-3 shadow-lg backdrop-blur-sm">
        <TriangleAlert size={18} className="shrink-0 text-[var(--color-danger)]" />
        <div>
          <p className="text-sm font-bold text-[var(--color-danger)]">Cảnh báo gian lận</p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            {FLAG_LABELS[currentFlag] || currentFlag} — đã được ghi nhận
          </p>
        </div>
      </div>
    </div>
  );
}
