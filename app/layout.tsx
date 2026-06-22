import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Học Toán 9",
  description: "Học toán lớp 9 mỗi ngày — lý thuyết, bài tập trắc nghiệm, bảng xếp hạng",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}
