# Review: Filter the todo list

- Rounds: 1
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
