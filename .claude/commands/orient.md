---
description: 🗺️  Codebase Orientation — quét cấu trúc project, tạo bản đồ kiến trúc, giúp AI không lạc
argument-hint: [quick|full]
---

🗺️ **Codebase Orientation**

Tạo bản đồ codebase để AI hiểu rõ project trước khi làm task. Phòng tránh tình trạng AI lạc đường, quên cấu trúc, sửa nhầm file.

## Cách dùng

```bash
/orient quick    # Chỉ mapping nhanh cấu trúc thư mục (1-2 phút)
/orient full     # Full scan: tree + key files + architecture (5-10 phút)
```

## Workflow

### Bước 1: Quét cấu trúc project

🔍 Nếu `/orient quick`:
```bash
# Tree cấp 2-3
find . -maxdepth 2 -type d | grep -v node_modules | grep -v .git | grep -v .next | sort

# Tìm file config quan trọng
find . -maxdepth 1 -type f \( -name "*.json" -o -name "*.yaml" -o -name "*.yml" -o -name "*.toml" -o -name "*.config.*" -o -name "Makefile" -o -name "Dockerfile" -o -name "README*" \) | sort
```

🔍 Nếu `/orient full`:
```bash
# Deep tree (cấp 4, exclude noise)
find . -maxdepth 4 -type d \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/dist/*" \
  ! -path "*/build/*" \
  ! -path "*/.next/*" \
  ! -path "*/__pycache__/*" \
  ! -path "*/.hermes/*" \
  | sort

# Thống kê: số file theo loại
find . -type f \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -20

# File lớn nhất (top 20)
find . -type f \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  -exec wc -l {} + 2>/dev/null | sort -rn | head -20
```

### Bước 2: Xác định architecture

Đọc các file quan trọng để hiểu architecture:

```markdown
1. README.md → dự án làm gì, tech stack
2. package.json / pubspec.yaml / Cargo.toml / requirements.txt → dependencies
3. Các file route/entry point (main.dart, index.tsx, main.py, app.js...)
4. Schema DB (nếu có)
5. File config môi trường (.env.example, config.yaml...)
```

### Bước 3: Tạo file `docs/codebase-summary.md`

Dùng `/cook` để tạo file summary:

```markdown
/cook tạo docs/codebase-summary.md — bản đồ codebase

Format:
# Project: [tên]
## Tech Stack
- Frontend: [framework]
- Backend: [framework]
- Database: [DB]
- Key packages: [dependencies chính]

## Directory Structure (cấp 2-3)
\`\`\`
.
├── src/
│   ├── components/    # UI components
│   ├── services/      # API calls
│   └── utils/         # Helpers
├── api/               # Backend routes
└── db/                # Schema + migrations
\`\`\`

## Architecture Overview
- [Pattern sử dụng: MVC, Bloc, Riverpod...]
- [Data flow: API → Service → State → UI]
- [Route structure]

## Key Files Map
| File | Vai trò |
|------|---------|
| src/main.tsx | Entry point |
| src/router.tsx | Route definitions |
| api/users.ts | User CRUD API |

## Conventions
- Naming: [camelCase/snake_case/PascalCase]
- State management: [Bloc/Provider/Redux...]
- Testing: [Jest/pytest...]
```

### Bước 4: Báo cáo

Sau khi xong, báo cáo ngắn gọn:
```
🗺️ Codebase mapped:
- 📁 45 directories, 230 files
- ⚙️ Stack: React + Node.js + PostgreSQL
- 📄 Summary saved to docs/codebase-summary.md
- ⚡ Load lại context bằng /orient quick nếu cần
```

## Lưu ý

- **Full scan chỉ cần làm 1 lần** — kết quả lưu ở `docs/codebase-summary.md`
- **Quick scan** mỗi lần vào task mới để refresh
- Khi codebase thay đổi nhiều → chạy `/orient full` lại
- File summary được tự động đọc trong codebase-understanding phase
- Nếu project có sẵn `docs/codebase-summary.md` → chỉ cần đọc, không cần scan lại
