# CLAUDE.md - Multiprofile V2 Windows

## Ngôn ngữ giao tiếp

**LUÔN LUÔN trả lời bằng tiếng Việt.** Mọi giải thích, báo cáo, câu hỏi, và tương tác với người dùng đều phải bằng tiếng Việt. Code, tên biến, commit message, và tài liệu kỹ thuật (comments) vẫn viết bằng tiếng Anh.

## Skill Routing — reverse-skill

🛡️ **reverse-skill** đã được cài tại `.claude/skills/reverse-skill/`. Khi user có task liên quan đến:
- APK reverse / Android / Frida / jadx / smali
- Binary / IDA / radare2 / disassembly
- JS reverse / frontend signature / SourceMap
- Web pentest / BurpSuite / SQL injection / Nmap
- CTF / Pwn / exploit
- Firmware / IoT / embedded
- Malware analysis
- LLM security / AI security testing
- API security / JWT / GraphQL

→ **PHẢI kích hoạt `reverse-skill`** và làm theo bootstrap flow trong `RULES.md`.

## Quy tắc quan trọng

- KHÔNG dùng mock/fake data trong tests - phải test thật
- KHÔNG thêm feature thừa ngoài yêu cầu (YAGNI)
- Giữ code đơn giản (KISS), không over-engineer
- Commit message bằng tiếng Anh, theo conventional commits
- Khi sửa code, đọc file trước rồi mới sửa
