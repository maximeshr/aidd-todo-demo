# Review: Todo list MVP

- Rounds: 1
- Started: 2026-11-04

## Round 1 · r-8257

- Date: 2026-11-04
- By: Maxime Sahroui
- Diff: `canary...feat/todo-mvp`
- Axes: code, functional, relevancy
- Verdict: approve
- Score: 7/11 met, 0 unmet, 4 unverified at runtime, 0 out of the diff

### Criteria

- [x] Phase 1 · Three adds, one toggle, one removal leave two todos in their original order with the expected done states — `src/todos.test.ts:54` (toggle then remove, order and done states asserted), `src/storage.test.ts:23` (save then load identical)
- [x] Phase 1 · Blank or whitespace-only title leaves the list unchanged; `"  buy milk  "` yields `buy milk`; same title twice yields two todos — `src/todos.ts:19-21`, `src/todos.test.ts:19-32`
- [x] Phase 1 · A saved list loads back identical; missing, invalid JSON or malformed data loads as an empty list — `src/storage.ts:24-33`, `src/storage.test.ts:23-40`
- [x] Phase 1 · A storage that throws on write makes the save return failure without throwing — `src/storage.ts:36-44`, `src/storage.test.ts:47-50`
- [x] Phase 1 · A `null` storage or one that throws on read loads an empty list without throwing — `src/storage.ts:26`, `src/storage.test.ts:42-45`
- [x] Phase 1 · `vp test` runs the new tests and `vite.config.ts` no longer sets `passWithNoTests` — `vite.config.ts:6-11`; `vp test --coverage` on head dd614c0: 2 files, 17 tests passed, exit 0
- [x] Phase 2 · `architecture.md` no longer mentions `passWithNoTests`; a `minor` changeset exists with a summary written for a user — `aidd_docs/memory/architecture.md` (grep finds no `passWithNoTests` outside `aidd_docs/tasks/`), `.changeset/todo-list-mvp.md:2-5`
- Unverified at runtime: Phase 2 · In the browser, three adds, one tick, one delete and a reload show the two remaining todos in order with the same done states — wiring present at `src/main.ts:31-38`; only a browser run with a reload shows it, and no run is recorded beside the plan
- Unverified at runtime: Phase 2 · A blank title adds nothing; a title containing `<b>x</b>` shows those characters as text — `src/main.ts:52-53` returns early on the unchanged list, `src/main.ts:77` uses `textContent`; what the screen displays needs a run
- Unverified at runtime: Phase 2 · With saving made to fail, an added todo still shows and the not-saved message appears — `src/main.ts:36-37` renders before saving and unhides `.todo__status` on `false`; `main.ts` has 0 % coverage and no run is recorded
- Unverified at runtime: Phase 2 · A done todo is struck through; a 300-character title without spaces wraps and the page has no horizontal scroll — `src/style.css:52-58` (`overflow-wrap: anywhere`, `line-through`), `min-width: 0` on the label; layout needs a browser

### Findings

- `src/main.ts:46` : every toggle and delete rebuilds all rows with `replaceChildren`, so the checkbox or delete button the user just activated is destroyed; a keyboard user loses the visible focus after each Space or Enter and a screen reader loses its position → after `render()`, move focus back to the same todo's checkbox (by id), or to the next row's delete button / the input after a removal; alternatively patch the changed row instead of rebuilding the list — 🟢 minor, frontend
- `src/main.ts:17` : the `role="status"` region is toggled from `hidden` with its text already in place, so many screen readers do not announce it, and a second consecutive failure is never re-announced → keep the live region rendered and empty, and set its `textContent` to the message on failure and to `""` on success — 🟢 minor, frontend
- `src/todos.ts:11` : `crypto.randomUUID` exists only in secure contexts; opening the dev server through a LAN IP over plain http (`vp dev --host`) makes every add throw a `TypeError` inside the submit handler, and nothing appears with no message → acceptable for the declared local-only target; if non-localhost access matters, fall back to a non-crypto id or catch and surface the failure — 🟢 minor, error-handling
- `src/main.ts:1` : the screen wiring (submit, toggle, delete, the not-saved status) has 0 % coverage (`vp test --coverage`: `main.ts` 0/0/0/0, total lines 29.57 %) and the browser QA run is not recorded beside the plan, so four acceptance criteria rest on code reading alone → record the browser run (date, head, scenario outcomes) beside `plan.md`, or add a DOM-level test of the save-failure path — 🟢 minor, code-health

## Challenge · round r-8257

Outcome of `/aidd-refine:02-challenge` on the same diff, against `spec.md` and `plan.md`. It does not change the round's verdict; it records the end-to-end trust check the review rubric does not score.

My confidence level of correctness now: 70%

# Correctness (100%)

- The todo rules match the spec: trimmed titles, blank titles rejected by returning the same list, insertion order kept, duplicates allowed through generated ids, no mutation (`src/todos.ts`, 100 % lines and branches covered).
- The saved list treats storage as untrusted: `null` storage, throwing `getItem`, invalid JSON, a non-array and any malformed item all load as an empty list; a throwing `setItem` returns `false` (`src/storage.ts`, `src/storage.test.ts`).
- The screen renders before it saves, so a failed save keeps the change on screen and shows the message until the next successful save (`src/main.ts:34-38`), which answers the shadow report's newly introduced question consistently.
- Titles go through `textContent` and the aria-label through `setAttribute`; no user data reaches `innerHTML`.
- Non-goals are respected: no edit, filter, reorder, length limit or cross-tab sync.
- Memory and release notes match the code: `architecture.md` flow and decisions, `project-brief.md` features, a `minor` changeset written for a user; `passWithNoTests` is gone.
- Gates on head dd614c0, run by the reviewer: `vp check --deny-warnings` exit 0; `vp test --coverage` 17/17 passed, exit 0; `quality-gate deadcode` exit 0; `quality-gate duplication` 0 clones; `vp run build` exit 0.

# Deal breakers

- The spec's own Done-when is a browser scenario (add three, tick one, delete one, reload; save failure shows the message; strike-through; wrap), and no artifact on this head proves it: `main.ts` has 0 % coverage, no run is recorded beside the plan, and this review ran no browser. The trust question "will the user be satisfied end to end" is therefore uncertain, not negative. Fixable in place: run the phase 2 Test Scope in a browser and record the outcome (date, head, each scenario) beside `plan.md`.

# Suggestions (enhancements only)

- Restore focus after `render()` to the toggled checkbox, or to a neighbor after a delete (`src/main.ts:46`).
- Keep the `role="status"` region rendered and set its text on failure, so screen readers announce every failed save (`src/main.ts:17`, `:37`).
- Guard or replace `crypto.randomUUID` if the app is ever opened outside a secure context (`src/todos.ts:11`).
- No simplification found: the work is already the smallest shape that meets the plan's decisions.
