---
objective: "A single user can add, complete, un-complete and delete todos in the browser, and finds the same list after a reload, as the locked spec states."
status: implemented
---

# Plan: Todo list MVP

Source: [spec.md](./spec.md)

## Phases

| #   | Phase                     | File                         | Depends on |
| --- | ------------------------- | ---------------------------- | ---------- |
| 1   | Todo rules and saved list | [`phase-1.md`](./phase-1.md) | none       |
| 2   | Todo screen               | [`phase-2.md`](./phase-2.md) | 1          |

## External sources

| URL                                                                                        | What it settled                                                                                                                                                               |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API | `setItem` throws when storage is full; with storage disabled, even reading `window.localStorage` or calling `getItem` can throw (`SecurityError`), so every access is guarded |
| https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID                         | `crypto.randomUUID()` is available in secure contexts, which includes `localhost`                                                                                             |

## Impact

| Category      | Verdict and evidence                                                                                                                                                                                                                                                    | Handled in |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| runtime       | Browser storage only; no server. Unverified until the browser check of phase 2                                                                                                                                                                                          | 2          |
| regression    | Low, observed: `src/main.ts` is fully replaced (its `innerHTML` template and `.todo__empty` line); only `index.html` loads it, nothing imports it; no test covers it; the quality-gate base config sets no coverage threshold (`node_modules/quality-gate/src/vite.js`) | 2          |
| architecture  | Today `src/main.ts` renders everything. Intended: DOM-free todo rules and a storage adapter under test, `src/main.ts` only wires them to the DOM                                                                                                                        | 1, 2       |
| documentation | `architecture.md` states `passWithNoTests` is temporary and shows a one-file flow; `project-brief.md` lists only the app shell; a changeset is needed for a user-facing feature                                                                                         | 1, 2       |

## Rules

| Rule                                                                                       | Why it applies                           |
| ------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Import from `vite-plus` and `vite-plus/test`, never `vite` or `vitest` (`architecture.md`) | The tests and config import test helpers |
| Tests sit next to the code as `src/**/*.test.ts` (`testing.md`)                            | The only path the config includes        |
| Fix the project, never the shared base config (`coding-assertions.md`)                     | Any red gate during the phases           |
| A user-facing change adds a changeset (`vcs.md`)                                           | The feature reaches users                |
| AI auto commits after each phase (`vcs.md`)                                                | Two phases, two commits at least         |

## Decisions

| Decision                                                                                               | Why                                                                   |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Keep the todo rules and the storage adapter free of the DOM, and pass the storage in                   | Unit tests run without a browser; `main.ts` stays a thin wiring layer |
| Treat saved data as untrusted: anything that is not a list of well-formed todos loads as an empty list | The spec requires unreadable data to give an empty, usable list       |
| Identify todos by a generated id, not by title or position                                             | Duplicate titles are allowed and deletion must target one todo        |
