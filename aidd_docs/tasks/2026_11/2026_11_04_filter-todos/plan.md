---
objective: "The user switches the todo list between All, Active and Done, the current view survives a reload, and no view ever changes the saved todos."
status: pending
---

# Plan: Filter the todo list

Source: [spec.md](./spec.md)

## Phases

| #   | Phase        | File                         | Depends on |
| --- | ------------ | ---------------------------- | ---------- |
| 1   | Filter views | [`phase-1.md`](./phase-1.md) | none       |

## External sources

| URL                                                                                     | What it settled                                                                        |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed | Toggle buttons expose the current view with `aria-pressed`, no ARIA tab pattern needed |

## Impact

| Category      | Verdict and evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Handled in |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| runtime       | A second key in browser storage, next to the todos; unverified until the browser check                                                                                                                                                                                                                                                                                                                                                                                                                           | 1          |
| regression    | Medium, observed: `src/main.ts` render, add and empty-state paths change; `todos.ts` and `storage.ts` keep their exports; `vp test` runs 20 tests in 3 files today (17 in `todos.test.ts` and `storage.test.ts`, 3 in `save-status.test.ts`), all passing; `toggle` and `remove` in `main.ts` find the row to focus in the full list, which breaks once rows are hidden; the focus rule (`.claude/rules/07-quality/7-keep-focus-on-rerender.md`) applies to the new views, where a ticked row may leave the view | 1          |
| architecture  | none, observed: `main.ts` already imports the DOM-free `todos.ts`, `storage.ts` and `save-status.ts`; the view logic joins the first two                                                                                                                                                                                                                                                                                                                                                                         | none       |
| documentation | `project-brief.md` key features; a `minor` changeset                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1          |

## Rules

| Rule                                                                             | Why it applies                                               |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Keep focus on re-render (`.claude/rules/07-quality/7-keep-focus-on-rerender.md`) | Ticking a row in "Active" or "Done" removes it from the view |
| Record every browser run in `browser-check.md` (`testing.md`)                    | The views are only observable in a browser                   |
| Saved data is untrusted, every storage access guarded (`architecture.md`)        | The saved view is read at start                              |
| A user-facing change adds a changeset (`vcs.md`)                                 | New feature                                                  |

## Decisions

| Decision                                                               | Why                                                                                                                                       |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| One phase, not a logic phase then a screen phase                       | In the MVP, a logic-only phase failed the dead-code gate until the screen used it; here the logic is small enough to ship with its screen |
| A failed save of the view changes the view anyway and shows no message | The view is a display preference; the not-saved message stays about the list, which the user cannot afford to lose                        |
