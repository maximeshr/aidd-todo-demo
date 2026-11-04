---
objective: "One Clear done button, shown only while a todo is done, removes every done todo from the saved list and keeps the rest in order."
status: pending
---

# Plan: Clear done todos

Source: [spec.md](./spec.md)

## Phases

| #   | Phase      | File                         | Depends on |
| --- | ---------- | ---------------------------- | ---------- |
| 1   | Clear done | [`phase-1.md`](./phase-1.md) | none       |

## External sources

| URL  | What it settled |
| ---- | --------------- |
| none | none            |

## Impact

| Category      | Verdict and evidence                                                                                                                                                                          | Handled in |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| regression    | Low, observed: `src/main.ts` gains one button and one action next to `update`, `render` and `changeRow`, which stay as they are; `todos.ts` gains one export; `vp test` passes 44 tests today | 1          |
| architecture  | none, observed: the rule joins the DOM-free `todos.ts`, wired in `main.ts` like `removeTodo`                                                                                                  | none       |
| documentation | `project-brief.md` key features; a `minor` changeset                                                                                                                                          | 1          |

## Rules

| Rule                                                                             | Why it applies                                                                 |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Keep focus on re-render (`.claude/rules/07-quality/7-keep-focus-on-rerender.md`) | The button disappears after clearing; focus goes to the input as the spec says |
| Record every browser run in `browser-check.md` (`testing.md`)                    | The button and its visibility are only observable in a browser                 |
| A user-facing change adds a changeset (`vcs.md`)                                 | New feature                                                                    |
