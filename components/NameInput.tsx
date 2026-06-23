"use client";

import { useState } from "react";
import { validateName } from "@/constants/badwords";

interface Props {
  onSave: (name: string) => void;
  initial?: string;
}

export default function NameInput({ onSave, initial }: Props) {
  const [value, setValue] = useState(initial || "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateName(value);
    if (err) {
      setError(err);
      return;
    }
    onSave(value.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-[var(--color-surface)] p-6 shadow-xl"
      >
        <h2 className="text-center text-lg font-bold">Nhập tên của bạn</h2>
        <p className="mt-1 text-center text-sm text-[var(--color-text-secondary)]">
          Tên sẽ được lưu và hiển thị trên bảng xếp hạng
        </p>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          placeholder="Nhập tên (2-30 ký tự)"
          maxLength={30}
          className="mt-4 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-[var(--color-danger)]">{error}</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-[var(--color-primary)] py-2.5 text-sm font-bold text-white transition-all hover:brightness-110"
        >
          Bắt đầu làm bài
        </button>
      </form>
    </div>
  );
}
