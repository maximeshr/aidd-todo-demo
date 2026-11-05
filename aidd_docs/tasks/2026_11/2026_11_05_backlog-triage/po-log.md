# Step 15 log: a defect, a task, and the backlog review

The assistant ran each skill; the training author played the product owner (PO).

## Reproduce first

Before any skill, the narrow input was measured, not taken from memory. `vp dev` on `canary` at `6715ae9`, headless Chrome driven over the DevTools protocol (the Playwright MCP server was unavailable), 2026-11-05:

| Viewport | `#app`    | `.todo`   | `.todo__input` | Placeholder text / content box |
| -------- | --------- | --------- | -------------- | ------------------------------ |
| 1482 px  | 200.72 px | 168.72 px | 121 px         | 145 px / 113 px                |
| 1024 px  | 200.72 px | 168.72 px | 121 px         | 145 px / 113 px                |
| 375 px   | 200.72 px | 168.72 px | 121 px         | 145 px / 113 px                |

`src/style.css` asks `.todo { width: min(32rem, 100% - 2rem) }`: 512 px on a wide screen. The step-09 review measured 115 px (different font metrics); the mismatch is the same.

## `/aidd-pm:09-defect` → [#6](https://github.com/maximeshr/aidd-todo-demo/issues/6)

### Capture

- No matching Defect in the backlog (#1 to #5 are an Epic and Stories).
- **Skill asked:** what is the expected behavior, from a source other than "it looks wrong"? **PO:** the page's own style rule (512 px wide on a wide screen, screen minus 2rem on a phone), and a placeholder that reads in full.
- **Skill asked:** who is affected? **PO:** every user, every visit: adding a todo is the main action.
- **The draft carried a diagnosis**, copied from the review: "`#app` shrinks to its content inside the `body` grid". **Removed:** the skill records the mismatch and never diagnoses it; the cause is for `/aidd-dev:08-debug` when someone picks the Defect up. The review stays linked as evidence of who saw it first.

### Assess

- Readiness: mismatch explicit, impact bounded, steps plus a dated measurement, environment named, verifiable (a check that can prove it gone). **Proposed `ready`.**
- **PO refused a relation:** the first draft said "the upcoming due date field (#2) will share the same row" and offered `related_to: #2`. Nothing in #2 or its spec says where the date is entered; that would be an invented relation. Removed from the Impact and not linked.

### Finalize

- **PO authorized:** `gh issue create`, #6, labels `defect`, `status:ready`, `source` the filter review. Re-edited once to drop the #2 sentence. Read back: title, labels, no `#2` in the body.
- No `order`: it is the only Defect.
