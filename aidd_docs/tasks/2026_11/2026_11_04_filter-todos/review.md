# Review: Filter the todo list

- Rounds: 3
- Started: 2026-11-04

## Round 1 · r-7c3e

- Date: 2026-11-04
- By: Maxime Sahroui
- Diff: `canary...feat/filter-todos`
- Axes: code, functional, relevancy
- Verdict: changes-requested
- Score: 4/7 met, 0 unmet, 3 unverified at runtime, 0 out of the diff

### Criteria

- [x] `visibleTodos` returns all, only not-done, or only done todos, in saved order — `src/todos.ts:40-43`, `src/todos.test.ts:64-89`
- [x] A saved view loads back; missing, unknown, unreadable or throwing storage loads `all`; a throwing save returns failure — `src/storage.ts:42-66`, `src/storage.test.ts:53-83`
- [x] Switching views leaves the saved todos unchanged — `src/main.ts:92-96`: `showView` writes only the view key and never calls `saveTodos`
- [x] `browser-check.md` records every Test Scope row on the validated commit; a `minor` changeset exists — `browser-check.md` rows 0-8 and teardown on `feee6a3`, `.changeset/filter-todos.md:2`
- Unverified at runtime: each button shows its view and is the only one pressed; an empty view names itself; adding in Done switches to All; ticking in Active removes the row and focus stays in the list — the recorded run is on `feee6a3`, not the reviewed head `697c609` (`src/` is identical between them, the later commits touch only task docs)
- Unverified at runtime: choosing Done then reloading reopens Done with todos unchanged — same: recorded on `feee6a3`
- Unverified at runtime: deleting in a filtered view removes the todo and focus lands on a visible row or the input — same: recorded on `feee6a3`

### Findings

- `src/style.css:70-74` : the pressed view button sets its own `outline`, which overrides the browser's `:focus-visible` ring, so keyboard focus on the current view is invisible (measured: the focused and unfocused pressed "All" button both compute to `solid 2px rgb(0, 0, 0)`, offset `-2px`); fails WCAG 2.4.7 on the button of the current view → mark the pressed state without `outline` (a background, a border or an underline), or add a distinct `.todo__views button:focus-visible` outline with a positive offset — 🟡 major, frontend
- `src/main.ts:85` : "Nothing to do yet." is written three times (`main.ts:17` in `EMPTY_VIEW.all`, the HTML at `main.ts:38`, and this ternary), and `EMPTY_VIEW.all` is never the text shown, because "All" is only empty when the list is → `empty.textContent = EMPTY_VIEW[todos.length === 0 ? "all" : view]` — 🟢 minor, rot
- `src/todos.ts:35-37` : the three views are declared twice, once as the `TodoView` union and once as `TODO_VIEWS`, with no compile check that they match, so a view added to the type alone would never load back → `export const TODO_VIEWS = ["all", "active", "done"] as const; export type TodoView = (typeof TODO_VIEWS)[number];` — 🟢 minor, rot

## Challenge

My confidence level of correctness now: 70%

# Correctness (100%)

- Every spec Done-when holds on the reviewed head `697c609`, rerun independently against `vp dev --port 5197`: Active shows `b`, `c`, Done `a`, All `a`, `b`, `c`; ticking `b` in Active removes it and focus lands on `c`'s checkbox; ticking the last active row empties the view to "No active todos." and focus goes to the input; deleting `b` among three in Done focuses `c`; adding `d` in Done presses All with `d` last; Done survives a reload; `{not a view` loads All.
- Six view switches wrote only `aidd-todo-demo:view` (instrumented `setItem`), and the saved todos string stayed byte-for-byte identical: the "a view never changes the saved list" constraint holds by construction (`showView` never calls `saveTodos`) and at runtime.
- The focus rule (`7-keep-focus-on-rerender.md`) is applied to the filtered list, not the full one: `changeRow` picks the target from `visible`, which closes the regression the plan's impact row predicted.
- Gates on `697c609`: `vp check --deny-warnings` clean, `vp test --coverage` 34/34 passing, `quality-gate deadcode` clean, `quality-gate duplication` 0 clones, `vp run build` builds.
- The narrow new-todo input is not a regression: on `canary` and on this branch, at a 1482 px viewport, the input is 115 px wide and `.todo` 163 px. The shrink-to-fit `#app` grid item predates this change.
- The recorded browser run is on `feee6a3`, not the head, but `git diff feee6a3 697c609` touches only task docs, so the evidence carries over; the independent rerun above confirms it.

# Deal breakers

- Keyboard focus on the current view's button is invisible (`src/style.css:70-74`): the pressed style's `outline` replaces the `:focus-visible` ring, so a keyboard user cannot tell when focus reaches it. The feature is about switching views, and this project treats keyboard focus as a rule of its own, so the outcome does not fully serve the keyboard user. It is a small fix in place: give the pressed state a non-outline mark, or a distinct `:focus-visible` outline, then rerun the keyboard rows of the browser check.

# Suggestions (enhancements only)

- Derive `TodoView` from `TODO_VIEWS` (`as const`) so the view list has one source of truth.
- Compute the empty text as `EMPTY_VIEW[todos.length === 0 ? "all" : view]` and drop the duplicated "Nothing to do yet." literal from `render`.
- Track the pre-existing narrow layout (`#app` shrinks to its content inside the `body` grid) as its own defect, outside this feature.
- `main.ts`, where all the focus logic lives, has 0 % unit coverage, so focus behavior is guarded only by manual browser runs. Consider extracting the focus-target choice (`visible`, `index`, `id` → target id or input) into a DOM-free function in `todos.ts` and unit testing it.

## Round 2 · r-d51e

- Date: 2026-11-04
- By: Maxime Sahroui
- Diff: `canary...feat/filter-todos`
- Axes: code, functional, relevancy
- Verdict: changes-requested
- Score: 3/7 met, 1 unmet, 3 unverified at runtime, 0 out of the diff

### Criteria

- [x] `visibleTodos` returns all, only not-done, or only done todos, in saved order — `src/todos.ts:41-44`, `src/todos.test.ts:64-89`
- [x] A saved view loads back; missing, unknown, unreadable or throwing storage loads `all`; a throwing save returns failure — `src/storage.ts:42-63`, `src/storage.test.ts:53-83`
- [x] Switching views leaves the saved todos unchanged — `src/main.ts:92-96`: `showView` writes only the view key and never calls `saveTodos`
- [ ] `browser-check.md` records every Test Scope row on the validated commit; a `minor` changeset exists — the changeset exists (`.changeset/filter-todos.md:2`), but `browser-check.md` still records `feee6a3`, and `git diff feee6a3 0a9bd06 -- src` changes `src/style.css` (the focus ring) and `src/main.ts` (the empty message): the keyboard rows that round 1 asked to rerun after the focus fix were not rerun or recorded, as `7-keep-focus-on-rerender.md` requires
- Unverified at runtime: each button shows its view and is the only one pressed; an empty view names itself; adding in Done switches to All; ticking in Active removes the row and focus stays in the list — the only recorded run is on `feee6a3`, before the `style.css` and `main.ts` fixes
- Unverified at runtime: choosing Done then reloading reopens Done with todos unchanged — same: recorded on `feee6a3`
- Unverified at runtime: deleting in a filtered view removes the todo and focus lands on a visible row or the input — same: recorded on `feee6a3`

### Findings

- `src/style.css:71` : `font-weight: bold` on the pressed button widens it, so the buttons to its right shift sideways on every view change (measured in Chromium: "All" 30.8 px → 33.0 px, "Active" 52.3 px → 56.0 px) → drop the weight change (the solid border and the tint already mark the pressed state), or reserve the bold width — 🟢 minor, frontend
- `src/todos.ts:34` : the comment calls `TODO_VIEWS` the views "in display order" and "the single source of the `TodoView` names", but the buttons hard-code their names and order in `src/main.ts:33-35`, so a view added to `TODO_VIEWS` gets no button and the display order is not read from it → render the buttons from `TODO_VIEWS` with a label map, or limit the comment to what holds ("every view; the source of the `TodoView` type") — 🟢 minor, rot
- `src/main.ts:99` : `TODO_VIEWS.find((candidate) => candidate === value)` repeats the parse in `src/storage.ts:45`, the same "string to `TodoView`" check written twice → export one `toTodoView(value: unknown): TodoView | undefined` from `src/todos.ts` and use it in both places — 🟢 minor, rot

## Challenge (round 2)

My confidence level of correctness now: 85%

# Correctness (100%)

- Round 1 major, invisible focus on the pressed view button (`src/style.css`): fixed in `0a5574b`. The pressed state now uses a solid border and a tint, with no `outline`, and `.todo__views button:focus-visible` sets its own ring. Measured on `0a9bd06` with `vp dev --port 5197`, keyboard only, in Chromium: the pressed "All" computes `outline: solid 2px rgb(0, 0, 0)`, offset `2px` when focused, and `outline: none` when not. The unpressed "Active" does the same. Screenshots show a ring around both, outside the border.
- The pressed state stays distinct from focus. The pressed button has a `solid 2px` border, a 15 % tint and weight 700. The others have the default `outset 2px` border, `rgb(239, 239, 239)` and weight 400. With "All" pressed and "Active" focused, the two read differently, and pressing a view with Space or Enter keeps focus and the ring on it.
- Round 1 minor, "Nothing to do yet." written three times (`src/main.ts`): fixed in `d3f6116`. The text now lives once, in `EMPTY_VIEW.all`, and `render` reads `EMPTY_VIEW[todos.length === 0 ? "all" : view]`. Observed messages: "Nothing to do yet." on a cleared start, after deleting the last todo, in Done with an empty list, and after a reload on Done with an empty list. "No active todos." shows in Active once every todo is ticked, and "No done todos." in Done once every todo is unticked. Focus goes to the input each time the view empties. There was no console error or warning.
- Round 1 minor, two declarations of the views (`src/todos.ts`): fixed in `0a9bd06`. `TodoView` is now `(typeof TODO_VIEWS)[number]`.
- The fixes changed nothing else. Every gate passes on `0a9bd06`: `vp check --deny-warnings` is clean, `vp test --coverage` passes 34/34, `quality-gate deadcode` exits 0, `quality-gate duplication` finds 0 clones, and `vp run build` builds.

# Deal breakers

- None. The round's verdict stays `changes-requested` only because `browser-check.md` was not rerun on the head. The independent run above shows the outcome holds.

# Suggestions (enhancements only)

- Rerun the keyboard rows of the Test Scope on `0a9bd06` and record them in `browser-check.md`, with a row for the visible focus ring. The project rule and `testing.md` require it, and it is the last unchecked criterion.
- Keep the pressed label's weight constant, so switching views no longer shifts the buttons.
- Either render the view buttons from `TODO_VIEWS`, or narrow its comment. Share one `toTodoView` parse between `main.ts` and `storage.ts`.
- The `0.25rem` gap equals the ring's offset plus its width, so a focused button's ring touches its neighbors' borders. It is still visible, but `0.5rem` would separate them.
- From round 1, still open and outside this round's fixes: `main.ts` has 0 % unit coverage, so focus behavior is guarded by browser runs alone.

## Round 3 · r-4bd2

- Date: 2026-11-04
- By: Maxime Sahroui
- Diff: `canary...feat/filter-todos`
- Axes: code, functional, relevancy
- Verdict: approve
- Score: 4/7 met, 0 unmet, 3 unverified at runtime, 0 out of the diff

### Criteria

- [x] `visibleTodos` returns all, only not-done, or only done todos, in saved order — `src/todos.ts:46-49`, `src/todos.test.ts:64-89`
- [x] A saved view loads back; missing, unknown, unreadable or throwing storage loads `all`; a throwing save returns failure — `src/storage.ts:42-54`, guarded by `isTodoView` (`src/todos.ts:41-43`, `src/todos.test.ts:100-108`), `src/storage.test.ts:53-83`
- [x] Switching views leaves the saved todos unchanged — `src/main.ts:98-102`: `showView` writes only the view key and never calls `saveTodos`
- [x] `browser-check.md` records every Test Scope row on the validated commit; a `minor` changeset exists — `browser-check.md` rows 0-11 and teardown on `33b1201`, the last commit touching `src/`; `git diff --stat 33b1201 9b224dc` lists `browser-check.md` alone; `.changeset/filter-todos.md:2`
- Unverified at runtime: each button shows its view and is the only one pressed; an empty view names itself; adding in Done switches to All; ticking in Active removes the row and focus stays in the list — `browser-check.md` rows 1, 5-7 pass on `33b1201`, not on the reviewed head `9b224dc` (code identical, the head adds only the record itself)
- Unverified at runtime: choosing Done then reloading reopens Done with todos unchanged — same: row 10, recorded on `33b1201`
- Unverified at runtime: deleting in a filtered view removes the todo and focus lands on a visible row or the input — same: row 8, recorded on `33b1201`

## Challenge (round 3)

My confidence level of correctness now: 90%

# Correctness (100%)

- Round 2 minor, the bold pressed label shifting its neighbors (`src/style.css:71`): fixed in `33b1201`, `font-weight` is gone. Measured on `9b224dc` with `vp dev --port 5197`, in Chromium, across All, Active, Done, All, Done, Active by click and Done by keyboard: All stays at left `643.64` width `30.82`, Active `682.46` + `52.30`, Done `742.77` + `47.87` px, every label at weight 400, gap 8 px. The figures match `browser-check.md` row 4.
- Round 2 minor, `TODO_VIEWS` claiming a display order the buttons did not read (`src/todos.ts:34`): fixed in `33b1201`. `src/main.ts:41` renders the buttons from `TODO_VIEWS` with the `VIEW_LABEL` map, and the DOM reads All/`all`, Active/`active`, Done/`done` in that order. The comment now holds.
- Round 2 minor, the string-to-view check written twice (`src/main.ts:99`, `src/storage.ts:45`): fixed in `33b1201`. One `isTodoView` type guard in `src/todos.ts:41-43`, used by `storage.ts:45` and `main.ts:106`, with unit tests for each view and seven non-views.
- Round 2 suggestions: the `0.25rem` gap is now `0.5rem`, and the Test Scope was rerun keyboard-first and recorded on `33b1201` with rows for the focus ring (2), the pressed state (3) and stable buttons (4).
- Pressed state distinct and focus ring visible, spot-checked: the pressed button computes a `solid` border and a 15 % tint, the others `outset` and `rgb(239, 239, 239)`. Tabbing from the input reaches the pressed Active, then the unpressed Done: each computes `outline: solid 2px`, offset `2px`, while focused and `:focus-visible`, and `none` otherwise. The viewport screenshot shows the ring outside the pressed border, clear of the next button. Enter on Done presses it and keeps focus and the ring on it. Done survived a reload. The console held no error or warning. The teardown left storage empty and "Nothing to do yet.".
- Gates on `9b224dc`: `vp check --deny-warnings` clean (53 files formatted, 8 linted), `vp test --coverage` 44/44 passing in 3 files, `quality-gate deadcode` exit 0, `quality-gate duplication` 0 clones, `vp run build` builds (4.21 kB JS).
- Checklist: no duplication left (one view list, one guard, the empty text once); no contradiction between comments and code; nothing speculative; no debug leftovers.

# Deal breakers

- None.

# Suggestions (enhancements only)

- `src/main.ts:104-107` reads each button's `data-view` back from the DOM and re-checks it with `isTodoView`, though `main.ts:41` built those buttons from `TODO_VIEWS` a few lines earlier. Creating the buttons with `document.createElement` inside one loop over `TODO_VIEWS` would bind each to its view directly and remove the round trip. This is optional.
- `src/style.css:2` declares `color-scheme: light dark`, and the pressed mark and the ring rely on `currentColor`. `browser-check.md` lists the dark scheme as not covered, and this round did not run it either. One dark-scheme screenshot would close that gap.
- The rule "a run on another head is unverified" can never be met for the head that records the run, because the record is committed after the run. Here the run on `33b1201` covers every line of code on `9b224dc`. Consider letting a run count when the only later changes are the record itself.
- Known, outside this feature's contract: `main.ts` has 0 % unit coverage (allowed by `testing.md`), and the page layout is narrow on `canary` too.
