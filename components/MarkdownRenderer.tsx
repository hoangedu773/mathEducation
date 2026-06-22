"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

function renderContent(text: string): string {
  let html = text;
  html = html.replace(/\$\$(.+?)\$\$/g, (_, f) => {
    try { return katex.renderToString(f.trim(), { displayMode: true }); } catch { return f; }
  });
  html = html.replace(/\$(.+?)\$/g, (_, f) => {
    try { return katex.renderToString(f.trim(), { displayMode: false }); } catch { return f; }
  });
  html = html
    .replace(/^### (.+)$/gm, '<h3 class="mt-4 mb-2 text-lg font-semibold">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="mt-6 mb-3 text-xl font-bold">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="mt-6 mb-3 text-2xl font-bold">$1</h1>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^  - (.+)$/gm, '<li class="ml-8 list-disc">$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/```\n([\s\S]*?)```/g, '<pre class="my-2 overflow-x-auto rounded-lg bg-[var(--color-border)] p-3 text-sm"><code>$1</code></pre>')
    .replace(/`(.+?)`/g, '<code class="rounded bg-[var(--color-border)] px-1 text-sm">$1</code>');
  return `<p class="mt-2">${html}</p>`;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = renderContent(content);
    }
  }, [content]);

  return <div ref={ref} className="prose max-w-none" />;
}
