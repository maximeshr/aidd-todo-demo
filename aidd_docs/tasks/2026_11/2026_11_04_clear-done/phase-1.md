---
status: pending
---

# Instruction: Clear done

## Architecture projection

```txt
.
├── .changeset/
│   └── clear-done.md         ✅
├── aidd_docs/memory/
│   └── project-brief.md      ✏️
└── src/
    ├── todos.ts              ✏️
    ├── todos.test.ts         ✏️
    ├── main.ts               ✏️
    └── style.css             ✏️
```

## Test Scope

| Scenario   | Action                                                      | Observable outcome                                                      | Actor   |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- | ------- |
| Setup      | Clear the site data, add `a`, `b`, `c`, `d`                 | No Clear done button                                                    | browser |
| Happy path | Tick `a` and `c`, click Clear done, reload                  | `b`, `d` in that order, before and after the reload; the button is gone | browser |
| Edge case  | With no done todo, tick one                                 | The button appears                                                      | browser |
| Edge case  | With `a` (done) and `b`, in the Done view, click Clear done | "No done todos."; focus on the input                                    | browser |
| Edge case  | With only done todos, click Clear done                      | "Nothing to do yet."; focus on the input                                | browser |
| Edge case  | Make `setItem` throw, tick a todo, click Clear done         | The done todo is gone on screen; the not-saved message shows            | browser |
| Teardown   | Clear the site data                                         | Back to the empty state                                                 | browser |

## Wireframe

```txt
┌──────────────────────────────────────────┐
│ (1) [ What needs to be done?    ] [Add]   │
├──────────────────────────────────────────┤
│ (2) [All] [Active] [Done]                 │
├──────────────────────────────────────────┤
│ (3) ☐ b                            [×]    │
│     ☑ ~~c~~                        [×]    │
├──────────────────────────────────────────┤
│ (4) [Clear done]                          │
└──────────────────────────────────────────┘
```

1. Form: unchanged.
2. View picker: unchanged.
3. List: unchanged.
4. Clear done: shown only while a todo is done.

## Tasks to do

### `1)` Clear rule

> DOM-free removal of every done todo.

1. Add `clearDone(todos)` to `src/todos.ts`: keeps active todos in order, returns the same list when none is done.
2. Cover it in `src/todos.test.ts`.

### `2)` Clear done button

> The screen offers the action only when it can do something.

1. In `src/main.ts`, add a Clear done button after the list; `render` hides it unless a todo is done, so ticking and unticking update it; on click, `update(clearDone(todos))` then focus the input.
2. Style it in `src/style.css` without moving the existing controls.

### `3)` Record the change

> Memory, release notes and browser evidence.

1. Update `project-brief.md` key features; add a `minor` changeset written for a user.
2. Run the Test Scope in a browser and record it in `browser-check.md` beside this plan.

## Test acceptance criteria

| Task | Acceptance criteria                                                                                                                                                                |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `clearDone` keeps only active todos in saved order and returns the same list when none is done                                                                                     |
| 2    | In the browser the button shows only while a todo is done; clicking it leaves the active todos in order, also after a reload, and focus is on the input                            |
| 2    | In the Done view with an active todo left, "No done todos." shows after clearing; with only done todos, "Nothing to do yet." shows; with saving broken the not-saved message shows |
| 3    | `browser-check.md` records every Test Scope row on the validated commit; a `minor` changeset exists                                                                                |
