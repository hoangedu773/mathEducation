---
description: 🛡️ Reverse Engineering / Penetration Testing / Security Research — sử dụng reverse-skill routing pack
argument-hint: [task description]
---

/security [mô tả task]

Kích hoạt `reverse-skill` và thực hiện bootstrap flow.

## QUY TRÌNH

1. **PHẢI** đọc `.claude/skills/reverse-skill/README.md` section 0 trước tiên
2. **PHẢI** chạy refresh tool index (Windows: `powershell -ExecutionPolicy Bypass -File skills/scripts/refresh-tool-index.ps1`)
3. **PHẢI** đọc `RULES.md` và thực thi tất cả instructions trong đó
4. **PHẢI** đọc `skills/routing.md` → match user intent → xác định entry skill
5. **PHẢI** đọc `skills/SKILL.md` → master entry

## Trigger (tự động route khi user nói)

- APK / Android reverse → skills/apk-reverse/
- Binary / IDA / radare2 → skills/ida-reverse/ hoặc skills/radare2/
- JS reverse / frontend signing → skills/js-reverse/
- HTTP traffic / BurpSuite → burp-mcp-full/
- CTF / Pwn → skills/pwn-chain/ hoặc CTF-Sandbox-Orchestrator/
- Firmware / IoT → skills/firmware-pentest/
- Malware analysis → skills/malware-analysis/
- LLM security → skills/llm-security/
- API security → skills/api-security/
- Pentest / red team → skills/pentest-tools/

## Prerequisites

- Đã clone reverse-skill vào `.claude/skills/reverse-skill/`
- Cần PowerShell trên Windows để chạy refresh-tool-index.ps1
- Một số skill cần tools: jadx, apktool, Frida, IDA, BurpSuite, nmap, nuclei, ...
