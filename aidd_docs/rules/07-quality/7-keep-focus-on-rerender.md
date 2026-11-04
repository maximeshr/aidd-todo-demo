<!-- aidd_rule:{"version":1,"category":"07-quality","slug":"7-keep-focus-on-rerender","description":"Keep keyboard focus when DOM code re-renders a list by replacing its rows","paths":["src/**/*.ts"],"targets":["claude"]} -->

# Keep focus on re-render

- When code rebuilds list rows (`replaceChildren`, `innerHTML`), give each row a stable `data-id` from the item's id, never its index or title.
- After the re-render that follows a user action on a row, move focus to the same item's control, found by that `data-id` (escape it with `CSS.escape`).
- After a removal, move focus to the row now at the removed index, else the last row, else the list's input.
- Verify it in the browser with the keyboard only, and record it in `browser-check.md`.
