---
description: Reverse-engineer a website's design taste (colors, typography, spacing, tokens)
argument-hint: <url>
---

/taste <url>

Reverse-engineer the design taste of <url> and produce taste.md + taste.json with concrete design tokens (colors, typography, spacing, radii, shadows, grid) AND taste DNA (Trigger → Decision → Reason → Evidence trade-offs explaining WHY the design works).

**IMPORTANT**: Activate `design-taste` skill.
**IMPORTANT**: Analyze the list of skills at `.claude/skills/*` and intelligently activate the skills that are needed for the task during the process.
**Ensure token efficiency while maintaining high quality.**

## Workflow:
1. Activate `design-taste` skill and follow its 4-step analysis pipeline:
   - Phase 0: Parse URL, export target, crawl scope
   - Phase 1: Capture page data via Playwright MCP (DOM extractor + screenshots)
   - Phase 2: Measure design tokens (colors, type scale, spacing, radii, shadows, grid)
   - Phase 3: Pattern recognition (layout grid, density, contrast ratio, responsive behavior)
   - Phase 4: Taste DNA (3-4 opinionated trade-offs with evidence)
2. Output `taste.md` + `taste.json` in current directory
3. Export to target format based on user's choice (Cursor, Windsurf, Claude Code, etc.)
4. Report back with summary of key findings — colors, type, spacing, and top 3 trade-offs

**Prerequisites:** Playwright MCP must be installed:
```bash
claude mcp add playwright -s user -- npx -y @playwright/mcp@latest --isolated
```

**Used together with:** `/cook`, `/bootstrap` to build portfolio sites using extracted design tokens.
