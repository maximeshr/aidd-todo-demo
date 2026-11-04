---
paths:
  - "src/**/*.ts"
---

# Keep focus on re-render

- When code rebuilds list rows (`replaceChildren`, `innerHTML`), give each row a stable `data-id` from the item's id, never its index or title.
- After the re-render that follows a user action on a row, move focus to the same item's control, found by that `data-id` (escape it with `CSS.escape`).
- After a removal, move focus to the row now at the removed index, else the last row, else the list's input.
- Verify it in the browser with the keyboard only, and record it in `browser-check.md`.

<!-- aidd_rule_output:path=.claude/rules/07-quality/7-keep-focus-on-rerender.md sha256=e37e50963def74b7fd636f39d1783efc763d1d80120c975340ed27e414f9d3b4 -->
