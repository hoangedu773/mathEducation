"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

function renderKaTeX(text: string): string {
  return text.replace(/\$\$(.+?)\$\$/g, (_, formula) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: true });
    } catch {
      return formula;
    }
  }).replace(/\$(.+?)\$/g, (_, formula) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: false });
    } catch {
      return formula;
    }
  });
}

export default function QuestionDisplay({ question }: { question: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = renderKaTeX(question);
    }
  }, [question]);

  return (
    <div className="min-h-[80px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div ref={ref} className="text-base leading-relaxed" />
    </div>
  );
}
