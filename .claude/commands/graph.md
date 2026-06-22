---
description: 🧠 Codebase Graph — bản đồ kiến trúc persistent, blast radius, context tối thiểu cho AI
argument-hint: [task description]
---

🧠 **Codebase Knowledge Graph** — code-review-graph (⭐18,659)

Dùng MCP tools của code-review-graph để query codebase thông minh:
- Kích hoạt tự động qua MCP server (`.mcp.json`)
- Graph tự update sau mỗi lần edit/write
- Hiển thị status ở đầu mỗi session

## Các MCP Tools có sẵn

```markdown
get_minimal_context(task="<mô tả>")     # Query blast radius (~100 tokens)
query_graph_tool(...)                    # Query cụ thể 1 node/edge
list_communities()                       # Xem architecture overview
review_changes                           # Prompt: review code thông minh
architecture_map                         # Prompt: bản đồ kiến trúc
onboard_developer                        # Prompt: giới thiệu codebase
```

## Cách dùng trong Claude Code

```markdown
# Khi bắt đầu task mới — query context tối thiểu
Hãy dùng get_minimal_context để xem những file nào liên quan đến task này

# Khi review code
Dùng review_changes prompt + get_minimal_context để chỉ đọc file cần thiết

# Khi muốn hiểu architecture
Dùng list_communities() + architecture_map để có overview
```

## Maintenance

```bash
code-review-graph build              # Build lại từ đầu
code-review-graph update             # Incremental update
code-review-graph status             # Xem thống kê graph
code-review-graph wiki               # Generate markdown wiki
```

## Lưu ý

- Graph tự động update sau mỗi lần sửa file (PostToolUse hook)
- Hiển thị status mỗi đầu session (SessionStart hook)
- Dùng `detail_level="minimal"` để tiết kiệm token
- `next_tool_suggestions` trong mỗi response cho biết bước tiếp theo tối ưu
