"use client";

interface Props {
  active: "log" | "banned" | "map";
  onChange: (tab: "log" | "banned" | "map") => void;
}

const TABS: { key: "log" | "banned" | "map"; label: string }[] = [
  { key: "log", label: "IP Log" },
  { key: "banned", label: "Banned" },
  { key: "map", label: "Map" },
];

export default function AdminTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-1 rounded-xl bg-[var(--color-border)] p-1">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
            active === key
              ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
