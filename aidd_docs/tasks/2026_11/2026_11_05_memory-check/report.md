# Memory check, 2026-11-05

### Structure

| File         | Gap     | Why                                                                         |
| ------------ | ------- | --------------------------------------------------------------------------- |
| `backlog.md` | missing | the `backlog` capability holds: the user names GitHub Issues as the tracker |

### Findings

| File              | Finding                                                           | Evidence                                                                      |
| ----------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `vcs.md`          | says the repository is "not published yet, local only for now"    | `gh repo view`: `maximeshr/aidd-todo-demo` is public, issues enabled          |
| `vcs.md`          | says "Tickets: none"                                              | the user now names GitHub Issues as the ticketing tool                        |
| `ecosystem.md`    | the graph has no tracker node: GitHub as tracker is a second role | `ecosystem-signals.md`: a platform that is also the tracker gives two entries |
| `architecture.md` | the "How it fits together" diagram omits the save status module   | `src/main.ts:2` imports `createSaveStatus` from `./save-status.ts`            |

### Notes

- `backlog.md` — the repo proves no tracker convention yet (no issue template, no labels beyond GitHub's defaults): its content comes from the user's answers only.
