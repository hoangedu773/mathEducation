# 📘 Hướng dẫn sử dụng Claude-Super_Kit

> Dành cho người mới — học 10 phút, xài cả đời.
> 
> **Trước khi đọc:** Cài Claude-Super_Kit vào project (link hoặc copy `.claude/` vào root dự án).
> 
> **Cách dùng:** Mở terminal → `claude` → gõ slash commands bên dưới.

---

## Mục lục

1. [Luồng làm việc cơ bản](#1-luồng-làm-việc-cơ-bản)
2. [Danh sách commands](#2-danh-sách-commands)
3. [Skills — tự động, không cần gọi](#3-skills--tự-động-không-cần-gọi)
4. [Sub-agents — team chuyên gia ngầm](#4-sub-agents--team-chuyên-gia-ngầm)
5. [Tình huống thực tế](#5-tình-huống-thực-tế)
6. [Mẹo & lưu ý](#6-mẹo--lưu-ý)

---

## 1. Luồng làm việc cơ bản

### Chu trình phát triển tính năng

```
┌─────────────┐
│  /brainstorm │  ← Thảo luận ý tưởng, chốt hướng đi
└──────┬──────┘
       ▼
┌─────────────┐
│   /plan     │  ← Researcher + Planner tạo kế hoạch
└──────┬──────┘
       ▼
┌─────────────┐
│   /cook     │  ← Code, test, review tự động
└──────┬──────┘
       ▼
┌─────────────┐
│   /test     │  ← Kiểm tra lại
└──────┬──────┘
       ▼
┌─────────────┐
│  /git:cm    │  ← Commit code
└─────────────┘
```

> Nếu có bug → `/debug` → sửa → `/test` lại.

### Nguyên tắc vàng

| Nếu muốn | Thì dùng |
|----------|----------|
| Code tính năng mới | **`/cook`** |
| Sửa lỗi | **`/fix`** |
| Debug sâu (phân tích, không tự fix) | **`/debug`** |
| Lên kế hoạch trước | **`/plan`** |
| Kiểm tra | **`/test`** |
| Commit code | **`/git:cm`** |

---

## 2. Danh sách commands

### 🔥 Commands cốt lõi (xài hằng ngày)

| Command | Mô tả | Ví dụ |
|---------|-------|-------|
| **`/plan <yêu cầu>`** | Lên kế hoạch chi tiết trước khi code → tạo file trong `plans/` | `/plan thêm tính năng tìm kiếm thuốc với Bloc` |
| **`/cook <task>`** | Implement tính năng hoàn chỉnh: research → plan → code → test → review | `/cook implement search screen với debounce 300ms` |
| **`/fix <lỗi>`** | Sửa lỗi — tự động chọn fix:fast (đơn giản) hoặc fix:hard (phức tạp) | `/fix null pointer khi list rỗng` |
| **`/debug <lỗi>`** | Debug sâu — phân tích root cause, **không tự fix**, chỉ báo cáo | `/debug crash khi gọi API không có network` |
| **`/test`** | Chạy test | `/test` |
| **`/brainstorm <câu hỏi>`** | Thảo luận ý tưởng — hỏi ngược, đưa options, phân tích pros/cons | `/brainstorm nên dùng Riverpod hay Bloc cho Flutter app này?` |

### 🧠 Commands planning

| Command | Mô tả |
|---------|-------|
| **`/plan:fast <yêu cầu>`** | Plan nhanh, ít research |
| **`/plan:hard <yêu cầu>`** | Plan kỹ, research sâu, parallel agents |
| **`/plan:ci <yêu cầu>`** | Plan cho CI/CD pipeline |
| **`/plan:two <yêu cầu>`** | Plan với 2 lựa chọn giải pháp |

### 🛠️ Commands fix

| Command | Mô tả |
|---------|-------|
| **`/fix:fast <lỗi>`** | Fix nhanh bug đơn giản |
| **`/fix:hard <lỗi>`** | Fix bug phức tạp (có research) |
| **`/fix:test <lỗi>`** | Fix test fail |
| **`/fix:ui <lỗi>`** | Fix UI bug |
| **`/fix:ci <lỗi>`** | Fix CI/CD fail |
| **`/fix:types <lỗi>`** | Fix type errors |
| **`/fix:logs <log>`** | Fix dựa trên nội dung log |

### 🔍 Commands tìm kiếm & review

| Command | Mô tả |
|---------|-------|
| **`/scout <nội dung>`** | Tìm file trong codebase — spawn nhiều agents tìm song song |
| **`/scout:ext <nội dung>`** | Tìm cả ngoài codebase (docs, issues, etc.) |
| **`/review:codebase <nội dung>`** | Review codebase tổng quan |

### 📐 Commands design

| Command | Mô tả |
|---------|-------|
| **`/design:good <UI>`** | Thiết kế UI chất lượng — gọi ui-ux-designer + multimodal |
| **`/design:fast <UI>`** | Thiết kế nhanh |
| **`/design:describe`** | Mô tả UI hiện tại |
| **`/design:screenshot`** | Chụp ảnh màn hình UI (nếu hỗ trợ) |
| **`/design:3d <yêu cầu>`** | Thiết kế 3D |
| **`/design:video <yêu cầu>`** | Thiết kế video |

### 📝 Commands content & docs

| Command | Mô tả |
|---------|-------|
| **`/content:good <yêu cầu>`** | Viết content chất lượng |
| **`/content:fast <yêu cầu>`** | Viết content nhanh |
| **`/content:cro <yêu cầu>`** | Viết content tối ưu conversion |
| **`/content:enhance <nội dung>`** | Cải thiện content có sẵn |
| **`/docs:init`** | Phân tích codebase, tạo docs lần đầu (PDR, architecture, code standards) |
| **`/docs:update`** | Cập nhật docs |
| **`/docs:summarize`** | Tóm tắt docs |

### 🎬 Commands bootstrap

| Command | Mô tả |
|---------|-------|
| **`/bootstrap <yêu cầu>`** | Tạo project mới từ đầu — research → kiến trúc → code → docs hoàn chỉnh |
| **`/bootstrap:auto <yêu cầu>`** | Bootstrap tự động, không hỏi |

### 🔧 Commands khác

| Command | Mô tả |
|---------|-------|
| **`/git:cm`** | Stage all + commit (có conventional commit message) |
| **`/git:cp`** | Cherry-pick commit |
| **`/git:pr`** | Tạo Pull Request trên GitHub |
| **`/skill:add <tên>`** | Thêm skill từ kho chính thức |
| **`/skill:create`** | Tạo skill mới |
| **`/skill:optimize`** | Tối ưu skill |
| **`/ask <câu hỏi>`** | Hỏi nhanh, trả lời ngắn, không làm gì thêm |
| **`/watzup`** | Kiểm tra trạng thái |
| **`/journal`** | Ghi nhật ký |
| **`/use-mcp <cấu hình>`** | Bật/tắt MCP server |

---

## 3. Skills — tự động, không cần gọi

**Skills là thư viện kiến thức.** Claude Code tự động kích hoạt skill phù hợp dựa vào context công việc. Cậu không cần gọi skill bằng tay.

### Skills hiện có

| Skill | Tự động kích hoạt khi |
|-------|----------------------|
| **backend-development** | Làm API, server, database |
| **frontend-development** | Code UI, component |
| **frontend-design** | Thiết kế giao diện |
| **mobile-development** | Code Flutter, React Native, Android, iOS |
| **ui-styling** | CSS, theme, styling |
| **databases** | SQL, NoSQL, queries |
| **debugging** | Debug lỗi |
| **devops** | CI/CD, deploy, infra |
| **code-review** | Review code |
| **planning** | Lên kế hoạch |
| **research** | Tìm kiếm thông tin |
| **problem-solving** | Giải quyết vấn đề phức tạp |
| **sequential-thinking** | Suy luận từng bước |
| **ai-multimodal** | Sinh ảnh, xử lý media |
| **media-processing** | Xử lý ảnh/video |
| **payment-integration** | Tích hợp thanh toán |
| **better-auth** | Authentication |
| **chrome-devtools** | Debug browser |
| **mcp-builder** | Xây dựng MCP server |
| **mcp-management** | Quản lý MCP |
| **shopify** | Shopify development |
| **threejs** | 3D graphics |
| **web-frameworks** | Next.js, Nuxt, etc. |
| **docs-seeker** | Tìm kiếm documentation |
| **skill-creator** | Tạo skill mới |
| **repomix** | Phân tích repository |

> Mỗi skill có `SKILL.md` và thư mục `references/` chứa tài liệu tham khảo chuyên sâu.

---

## 4. Sub-agents — team chuyên gia ngầm

Đây là các chuyên gia AI được spawn ra để làm việc song song. Cậu **không gọi trực tiếp** — chúng tự động được triệu hồi bởi các commands.

| Agent | Chuyên môn | Được gọi bởi |
|-------|-----------|-------------|
| **planner** | Lên kế hoạch implement, tạo file trong plans/ | `/plan`, `/cook` |
| **researcher** | Nghiên cứu giải pháp, best practices | `/plan`, `/cook`, `/fix:hard`, `/review:codebase` |
| **code-reviewer** | Review code chất lượng, security, performance | `/cook` |
| **tester** | Chạy test, phân tích kết quả | `/cook`, `/test` |
| **debugger** | Tìm root cause bug | `/debug` |
| **docs-manager** | Viết và duy trì documentation | `/docs:*`, `/cook` |
| **ui-ux-designer** | Thiết kế UI, generate assets | `/design:*`, `/cook` |
| **git-manager** | Git operations | `/git:*` |
| **scout** | Tìm file trong codebase | `/scout`, `/cook` |
| **scout-external** | Tìm thông tin ngoài codebase | `/scout:ext` |
| **brainstormer** | Hỗ trợ brainstorming | `/brainstorm` |
| **copywriter** | Viết content, copy | `/content:*` |
| **database-admin** | Quản lý database | Khi cần |
| **project-manager** | Quản lý tiến độ, task | Khi cần |
| **mcp-manager** | Quản lý MCP servers | Khi cần |
| **journal-writer** | Ghi nhật ký | `/journal` |

---

## 5. Tình huống thực tế

### 🏪 Flutter: Thêm màn hình search thuốc

```bash
# Bước 1: Thảo luận
/brainstorm muốn thêm màn hình search thuốc với live-fetch từ Long Châu.
Nên dùng search API hay scrape? Bloc hay Riverpod?
# → AI hỏi ngược, phân tích options, chốt giải pháp

# Bước 2: Lên plan
/plan thêm màn hình search thuốc.
Stack: Flutter, Bloc, Dio, Retrofit, injectable.
# → Researcher tìm best practices, Planner tạo plan trong plans/

# Bước 3: Code
/cook implement theo plan ở plans/260613-search-screen
# → Tự động code + test + review, loop fix lỗi

# Bước 4: Debug (nếu bug)
/debug crash khi search không có kết quả
# → Debugger phân tích, báo cáo root cause

# Bước 5: Commit
/git:cm
```

### 🐛 Bug fix nhanh

```bash
/fix:test search_bloc_test failing - null safety issue
```

### 📝 Tạo docs cho project cũ

```bash
/docs:init
# → Tự động sinh: docs/project-overview-pdr.md
#                          docs/codebase-summary.md
#                          docs/code-standards.md
#                          docs/system-architecture.md
```

---

## 6. Mẹo & lưu ý

### ✅ Nên

- **Mô tả task bằng tiếng Việt** — AI hiểu, chỉ code/convention là tiếng Anh
- **Dùng `/plan` trước `/cook`** nếu task phức tạp → tránh lạc hướng
- **Dùng `/debug` khi muốn phân tích** — nó chỉ báo cáo, không động vào code
- **Dùng `/fix` khi muốn sửa luôn** — nó tự detect fast hay hard
- **Commit thường xuyên** bằng `/git:cm`

### ❌ Không nên

- Gõ lung tung command không có mô tả rõ ràng
- Đòi hỏi AI làm task cực lớn trong 1 lệnh — chia nhỏ ra
- Dùng `/fix` khi cần phân tích root cause trước → dùng `/debug` trước

### 💡 Mẹo

- **`/cook`** là command quyền năng nhất — nó làm gần như mọi thứ
- Nếu code bị sai hướng sau `/cook`, gõ **`/fix`** để nó tự sửa
- Sau khi dùng `/docs:init`, nhớ review và chỉnh sửa lại docs cho đúng
- Khi tạo project mới, **`/bootstrap`** sinh ra cả cấu trúc hoàn chỉnh

---

> ⚡ **Nguyên tắc:** Mô tả task bằng ngôn ngữ tự nhiên, AI làm phần còn lại.
> 
> *Happy coding!*
