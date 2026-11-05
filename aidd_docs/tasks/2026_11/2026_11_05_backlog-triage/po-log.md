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

## `/aidd-orchestrator:02-backlog`

Request: two intakes, then a health review and an ordering of the whole backlog. No mode given, so **interactive**: every change approved before it is written.

### Inspect

- Support: GitHub Issues, from `backlog.md`; confirmed live with `gh`. One support, so no selection question.
- Read model (`gh issue list`, sub-issues, "blocked by" links): Epic #1 `ready` with children #2 `ready`, #3, #4, #5 `proposed` (in that order), #3 to #5 blocked by #2; Defect #6 `ready`; Task #7 `ready`. Nothing closed. Owning skills (Epic, Stories, Spike, Defect, Task) verified installed.

### Triage

| Intake                                 | Classified as                     | Compared with                                                                                                                    | Route                           |
| -------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| "the add box is too small on my phone" | observed mismatch                 | #6: same box, same mismatch, 375 px already measured                                                                             | **reuse #6**, no new Defect     |
| "I want a due this week view"          | one deliverable behaviour (Story) | #3 covers today and overdue only; the Product Brief lists "this week" as an open decision, deferred until the validation session | stopped: a new product decision |

- **Skill asked:** the second intake is a product decision the brief deferred. Create a Story now, or keep the deferral? **PO:** keep the deferral, no artifact. The validation session decides; a Story now would pre-empt it.
- **PO refused** to add the phone report to #6 as a comment: it brings no new evidence (375 px is already in the reproduction).

### Review (health)

| Signal                                    | Finding                                                                                                                                                                           | Proposal                                               |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `ready` Epic, goal                        | #1's goal resolves to `aidd_docs/product/plan-my-week.md`                                                                                                                         | none                                                   |
| unresolved dependency                     | #3, #4, #5 blocked by #2: confirmed truly blocked (they need dates to exist), not merely ordered                                                                                  | none                                                   |
| `ready` artifacts                         | #2 (locked spec), #6 (reproduced, verifiable), #7 (done conditions, standalone) re-read by their owners: still ready                                                              | none                                                   |
| Task or Story without a parent            | #7 standalone, intent recorded at creation                                                                                                                                        | none                                                   |
| ordered Story set                         | #2, #3, #4, #5: one position each, no gap                                                                                                                                         | none                                                   |
| new Story evidence not reflected upstream | #2 gained two rules at refinement (an invalid date blocks the add; the date is a local calendar day). Sibling #5 also takes a date as input and says nothing about an invalid one | **#5: add the invalid-date rule**; owner: User Stories |
| same, toward the parent                   | Epic #1 is outcome-level; the new rules do not change its outcome or boundaries                                                                                                   | none                                                   |
| WIP and age                               | no project policy: not evaluated                                                                                                                                                  | none                                                   |

- Not proposed, reported: the PRD does not carry the decisions taken downstream (date form, invalid date). The PRD is not a backlog artifact and the PRD skill has no refine route; **PO decided** it stays the historical source, the spec is the contract.
- Learning offered: "a spec is linked to its Story as `related_to`, there is no `spec` field" could go into `backlog.md`. **PO declined for now**: one occurrence is not yet a convention.

### Ordering

- **Skill observed:** the skills order only within a set (Stories under their Epic, Defects among Defects, Tasks under their parent). Nothing orders an Epic, a Defect and a standalone Task against each other, and GitHub Issues has no native order outside sub-issues.
- **PO decided** the next pulls, recorded here and nowhere else: **#6** (every user, every visit, small), then **#7** (covers the screen before #2 changes it: risk reduction), then **#2**. No field written: inventing one would break "one authority per field".

### Decide

Change set shown, one entry:

| identity | artifact | operation | owner        | before                                                        | after                                                                                                                                                              | evidence                       |
| -------- | -------- | --------- | ------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| #5       | Story    | update    | User Stories | acceptance has no invalid-date rule; relations: `source` only | + "When the new date is not valid or incomplete, the due date does not change and the user is told the date is not valid."; + `related_to` the three amigos result | three amigos F5 decision on #2 |

- **PO wanted a second entry** (the local-date anchor on #5 too) then **withdrew it**: #5 changes a day the user picks, and "today" never appears in #5; the anchor lives in #2, which every date rule builds on. Not an entry.
- **PO approved** the single entry. Change set frozen.

### Apply and verify

- Applied by the User Stories owner (`gh issue edit 5`); no re-ask. Diff: two lines added, nothing else.
- Verified on the live support: #5 body contains the new rule; labels unchanged (`story`, `status:proposed`); still blocked by #2; #1 children still `[2,3,4,5]`. No extra mutation. Backlog coherent.
