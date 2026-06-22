"use client";

interface Props {
  active: "today" | "week" | "month" | "all";
  onChange: (filter: "today" | "week" | "month" | "all") => void;
}

const TABS: { key: "today" | "week" | "month" | "all"; label: string }[] = [
  { key: "today", label: "Hôm nay" },
  { key: "week", label: "Tuần" },
  { key: "month", label: "Tháng" },
  { key: "all", label: "Tất cả" },
];

export default function TimeFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-1 rounded-xl bg-[var(--color-border)] p-1">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
            active === key
              ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
