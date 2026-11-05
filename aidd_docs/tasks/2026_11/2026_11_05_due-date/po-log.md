# Step 14 log: make Story #2 ready for development

Story [#2](https://github.com/maximeshr/aidd-todo-demo/issues/2), give a todo a due date. The assistant ran each skill; the training author played the product owner (PO). No code is written in this step.

## `/aidd-pm:04-spec` (build)

Input: Story #2 and the PRD. The skill does not explore the code; it lifted the Story's acceptance and the PRD's non-goals.

- **Folder:** the skill reuses "this feature's folder when one exists". `2026_11_05_plan-my-week/` holds the Epic-level logs; **PO decided** one folder per Story spec, `2026_11_05_due-date/`, so a later Story gets its own.
- Draft committed as is (`docs: draft the due date spec`), with one gap: `TBD: How does a due date read on screen?` (the question the PO sent from the PRD to the spec).

## Validation of the draft against `spec-validator.yml`

Result: **invalid**, two reasons.

1. Hard threshold `contains_implementation_details`: the draft said the date "is saved with the todo as a `YYYY-MM-DD` string next to its title". That is a storage format, not intent. **PO refused the line**: how the date is saved is the plan's call. Removed; the observable rules (survives a reload, an unreadable date loads as none) stay.
2. `open_questions`: one TBD, so the spec cannot be locked.

Two more corrections found while re-reading the done-when:

- "shows it ... in all, active and done views": a new todo is active and never appears in the done view. Rewritten: "in the done view once ticked".
- The year example said "added in 2026"; what matters is when the date is shown. Rewritten: "Shown during 2026".

## `/aidd-pm:05-spike` (qualify only)

- **PO asked** for a spike on time zones: three amigos (F1) flagged that a calendar day can show one day off.
- **Skill qualified it as no spike**: the question is answerable in the current exchange and is routine implementation knowledge, not a decision only an investigation can settle. Evidence gathered in the exchange (Node, three time zones):

  | Time zone             | read the saved day as UTC | read it as a local day |
  | --------------------- | ------------------------- | ---------------------- |
  | `America/Los_Angeles` | 6 (one day off)           | 7                      |
  | `UTC`                 | 7                         | 7                      |
  | `Pacific/Kiritimati`  | 7                         | 7                      |

- So the risk is real but has a known way out, and the spec already makes it observable (done-when: "on a device set to a time zone west of UTC, the day shown is the day entered"). No Spike created, no backlog write. **PO accepted** the verdict.

## `/aidd-pm:04-spec` (refine)

Findings fed in: the storage line (remove), the TBD (PO answer), the two done-when fixes.

- **PO answered the TBD:** weekday, day and month in the browser's language ("Fri 7 Nov"), year only when it is not the current year. **No relative words**: "Tomorrow" goes stale while the page is open, which the PRD already accepts for the view but not for the date itself.
- `before -> after`:
  - Hard constraints: "saved ... as a `YYYY-MM-DD` string" -> removed; (absent) -> the date's form.
  - Done-when: "in all, active and done views" -> "in the all and active views, in the done view once ticked"; (absent) -> the year example.
  - Open Questions: the TBD -> `None`.
- Re-validated: every required criterion filled, no hard threshold hit. **PO locked the spec.** From now on a change means a new spec, never an edit.

## Readiness of #2

- The conflict left by three amigos (F4) is settled by the spec. Every INVEST row passes and no blocking question remains.
- **PO authorized** the transition `proposed -> ready` and the link to the spec.
