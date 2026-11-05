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

## `/aidd-pm:10-task` → [#7](https://github.com/maximeshr/aidd-todo-demo/issues/7)

Input: "Give `src/main.ts` automated test coverage; today 0 %." Measured first: `vp test --coverage` on `6715ae9`, `main.ts | 0 | 0 | 0 | 0 | 18-165`, 48 tests passing.

### Frame

- **Skill qualified:** delivery work with no user-visible change: a Task, not a Story.
- **Skill asked (outcome):** is the outcome a coverage figure? **PO refused** a percentage target: a number can be reached with tests that assert nothing. The outcome is the list of behaviours the screen already promises, each checked by a test.
- **Skill asked (ownership):** does it belong under Story #2, which will change `main.ts` next? **PO:** standalone, on purpose. The debt predates the Epic (reviews of steps 06 and 09 noted it), and parenting it would make #2 wait on it: an artificial coupling.
- **Skill asked (scope):** due date tests included? **PO:** no, they ship with #2. Also excluded: browser runs in CI, any change of behaviour.

### Review

- No duplicate. Readiness: one verifiable result, bounded scope, completion evidence named, standalone intent explicit, source linked. No `work_kind`: the project does not use it.
- The skill kept the "how" out: the draft named a DOM test environment package; **removed**, choosing a tool is the plan's job.
- **PO authorized** `ready`.

### Finalize

- `gh issue create`, #7, labels `task`, `status:ready`. Read back: title and labels match.
