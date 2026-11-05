# Three Amigos: Story #2, give a todo a due date

`/aidd-pm:08-three-amigos`, four invocations: three `assess` routes run as isolated parallel agents on the same snapshot (one lens each, none saw the others), then one `reconcile`. Nothing was written by the skill; the PO decided afterwards.

- Target: [#2](https://github.com/maximeshr/aidd-todo-demo/issues/2), snapshot `2026-11-05T19:35:41Z` (issue `updatedAt`).
- Role verdicts: product `revise`, delivery `revise`, quality `revise`.

## Reconciled result

Verdict: **revise**. Two amendments are entailed by evidence; three questions need a product decision; one conflict on impact.

### Findings

| Id  | Roles (source ids)                  | Impact       | Claim                                                                                        | Evidence                                                                                                                           |
| --- | ----------------------------------- | ------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| F1  | delivery D1, quality Q3             | material     | The Story drops the PRD's day anchor: no "whose calendar", so a date can show one day off    | PRD: "'Today' is the local date of the device showing the list." Story keeps only "a calendar day, with no time"                   |
| F2  | product P1, delivery D2             | material     | Nothing says todos saved before due dates existed keep loading and behaving as today         | Brief: "Todos without a date keep working exactly as today"; saved todos today are `{id, title, done}` (`src/storage.ts` `isTodo`) |
| F3  | quality Q1, delivery D2             | material     | "A due date that cannot be read" is undefined, and today one bad item empties the whole list | `src/storage.ts`: `parsed.every(isTodo) ? parsed : []`                                                                             |
| F4  | product P2, delivery D3, quality Q2 | see conflict | How a due date reads on screen is undecided                                                  | PRD open question, "decided in the spec"; no spec yet                                                                              |
| F5  | quality Q4                          | material     | Adding a todo with an invalid or incomplete date has no stated outcome                       | Story acceptance covers only a valid date or none                                                                                  |
| F6  | delivery D4, quality Q5             | minor        | The display criteria can only be proven by a recorded browser run                            | `testing.md`: "the screen code has no unit coverage"                                                                               |
| F7  | product P3                          | minor        | Until #5 ships, a wrong date cannot be fixed; accepted at slicing                            | `po-log-backlog.md`, Slice                                                                                                         |

### Conflict

- F4: product rates it **minor** (the PO deferred the form to the spec on purpose; the Story is not blocked); quality rates it **material** ("shows its date" has no expected result). Both kept; no lens ranks above another.
- Question: can #2 be called ready before the date's form is fixed?

### Proposed amendments

| Finding | Before                                        | After                                                                                                                                                                   | Evidence                       |
| ------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| F1      | "A due date is a calendar day, with no time." | "A due date is a calendar day, with no time, read in the local date of the device showing the list: the day shown is the day entered, whatever the device's time zone." | PRD acceptance criterion 1     |
| F2      | (absent)                                      | "A todo saved before due dates existed loads as a todo without a due date and behaves as it does today."                                                                | Brief, Product Bet; PRD goal 4 |

### Open questions

1. F3: which saved values count as an unreadable due date, and does that todo keep its title and done state?
2. F4: is #2 ready before the date's form is fixed?
3. F5: what happens when the date entered while adding a todo is invalid or incomplete?

## PO decisions

- F1, F2: **accepted** as proposed.
- F3: a saved due date is unreadable when it is not a real calendar day (a missing day like 30 February counts). That todo keeps its id, title and done state and loads without a date. The exact saved form is the spec's business.
- F4: **#2 stays `proposed`** until its spec fixes the date's form (next step). Quality is right that the criterion has no expected result yet; product is right that the Story should not freeze it. The spec settles it.
- F5: the todo is **not added**, the typed title and date stay in place, and the user is told the date is not valid. Silently dropping a date the user typed is worse than one more try.
- **Refused:** F6's implied amendment to add "recorded in a browser check" to the acceptance. The Story skill's own readiness rule says quality gates the whole team applies belong to the Definition of Done, never to a Story's acceptance; `testing.md` already requires it for every screen change.
- **Refused:** D2's note that `architecture.md` must change. True once the code changes, but that is a delivery consequence for the implementer and `/aidd-context:10-learn`, not a Story line.
- F7: no change.
