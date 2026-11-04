# Review: Clear done todos

- Rounds: 1
- Started: 2026-11-04

## Round 1 · r-40ac

- Date: 2026-11-04
- By: Maxime Sahroui
- Diff: `canary...a069dd0`
- Axes: code, functional, relevancy
- Verdict: approve
- Score: 2/4 met, 0 unmet, 2 unverified at runtime, 0 out of the diff

### Criteria

- [x] `clearDone` keeps only active todos in saved order and returns the same list when none is done — `src/todos.ts:35`, covered by `src/todos.test.ts:101` (order, all done, same reference when none done, no mutation)
- Unverified at runtime: in the browser the button shows only while a todo is done; clicking it leaves the active todos in order, also after a reload, and focus is on the input — `browser-check.md` rows 0 to 3 pass, but they were recorded on `aeddc87`, not on the reviewed head `a069dd0`. A run on `a069dd0` would show the button toggling with ticks, `b`, `d` kept after a reload, and focus on `.todo__input`. Between `aeddc87` and `a069dd0`, only `browser-check.md` and the `plan.md` status changed.
- Unverified at runtime: in the Done view with an active todo left, "No done todos." shows after clearing; with only done todos, "Nothing to do yet." shows; with saving broken, the not-saved message shows — `browser-check.md` rows 3 to 5 pass on `aeddc87`, not on the head. The code path is `src/main.ts:94` (empty message rule) and `src/main.ts:69-73` (render before `announceSave`).
- [x] `browser-check.md` records every Test Scope row on the validated commit; a `minor` changeset exists — `browser-check.md` has one row for each of the 7 Test Scope rows, on `aeddc87`; `.changeset/clear-done.md` is `minor`

## Challenge

My confidence level of correctness now: 90%

# Correctness (100%)

- Every spec hard constraint is met in the code. One action removes every done todo and keeps the active ones in order (`src/todos.ts:35`). Visibility depends on all todos, whatever the view (`src/main.ts:95`). There is no confirmation step. Focus goes to the input (`src/main.ts:116`). The view is unchanged, and the empty message follows the existing rule (`src/main.ts:94`). A failed save keeps the cleared list on screen, because `render` runs before `announceSave` (`src/main.ts:69-73`).
- All spec non-goals hold: no undo, no clearing by view, no count on the button.
- The change is as small as it can be: one pure function, one button, one handler, and one CSS selector added to an existing rule. No new abstraction.
- The gates pass on the head `a069dd0`: `vp check --deny-warnings`, `vp test --coverage` (48 tests), `quality-gate deadcode`, `quality-gate duplication` (0 clones), and `vp run build`.

# Deal breakers

-

# Suggestions (enhancements only)

- The "is any todo done" predicate is written twice, at `src/main.ts:95` and inside `clearDone` at `src/todos.ts:36`. Only the second copy is unit tested. Exporting a `hasDone(todos)` from `todos.ts` would give the button's visibility rule a unit test, without needing DOM coverage.
- The browser evidence sits on `aeddc87`, one commit behind the head. Re-recording `browser-check.md` on the head that will merge would turn the two unverified criteria into checked ones.
