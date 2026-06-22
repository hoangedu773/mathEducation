# Web Học Toán 9

Website học toán lớp 9 mỗi ngày: lý thuyết, bài tập trắc nghiệm, bảng xếp hạng.

**Stack:** Next.js 16 App Router + Tailwind CSS v4 + Supabase + Vercel.

## Cài đặt

```bash
npm install
cp .env.example .env.local
# Điền NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Deploy

Push lên GitHub → import vào Vercel. Nhớ set Environment Variables trong Vercel dashboard.

## Cấu trúc thư mục

```
app/           — Next.js App Router pages
components/    — React components
lib/           — helpers (data, quiz, ip, supabase, anti-cheat)
constants/     — badwords filter
data/          — bài học mẫu (Markdown + JSON)
```

## License

MIT
