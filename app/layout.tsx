import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import ToastContainer from "@/components/Toast";
import PageTracker from "@/components/PageTracker";
import "./globals.css";

const inter = Inter({ subsets: ["vietnamese", "latin"] });

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                  document.documentElement.classList.add('theme-ready');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]`}>
        <a href="#main-content" className="skip-to-content">
          Bỏ qua điều hướng
        </a>
        <Header />
        <main id="main-content" className="mx-auto max-w-4xl px-4 pt-20 pb-8">{children}</main>
        <ToastContainer />
        <PageTracker />
      </body>
    </html>
  );
}
