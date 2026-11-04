---
status: pending
---

# Instruction: Filter views

## Architecture projection

```txt
.
├── .changeset/
│   └── filter-todos.md       ✅
├── aidd_docs/memory/
│   └── project-brief.md      ✏️
└── src/
    ├── todos.ts              ✏️
    ├── todos.test.ts         ✏️
    ├── storage.ts            ✏️
    ├── storage.test.ts       ✏️
    ├── main.ts               ✏️
    └── style.css             ✏️
```

## Test Scope

| Scenario   | Action                                           | Observable outcome                                                           | Actor   |
| ---------- | ------------------------------------------------ | ---------------------------------------------------------------------------- | ------- |
| Setup      | Clear the site data, add `a`, `b`, `c`, tick `a` | All shows `a` (done), `b`, `c`                                               | browser |
| Happy path | Choose Active, then Done, then All               | `b`, `c`; then `a`; then `a`, `b`, `c` in order; the chosen button is marked | browser |
| Edge case  | In Active, tick `b`                              | `b` leaves the view; Done shows `a`, `b`; focus stays in the list            | browser |
| Edge case  | Untick every todo, choose Done                   | A message for an empty done view, not "Nothing to do yet."                   | browser |
| Edge case  | With Done current, add `d`                       | All is current, `d` is last                                                  | browser |
| Edge case  | In Done, delete one of two done todos            | It disappears; focus goes to the other done todo's checkbox                  | browser |
| Edge case  | Switch views several times                       | The saved todos, their order and done states are byte-for-byte unchanged     | browser |
| Edge case  | Choose Done, reload                              | Done is current, todos and done states unchanged                             | browser |
| Edge case  | Save an unreadable view, reload                  | All is current                                                               | browser |
| Teardown   | Clear the site data                              | Back to the empty state                                                      | browser |

## Wireframe

```txt
┌──────────────────────────────────────────┐
│ (1) AIDD Todo                             │
├──────────────────────────────────────────┤
│ (2) [ What needs to be done?    ] [Add]   │
├──────────────────────────────────────────┤
│ (3) [All] [Active] [Done]                 │
├──────────────────────────────────────────┤
│ (4) ☐ buy milk                     [×]    │
│     ☐ water the plants             [×]    │
├──────────────────────────────────────────┤
│ (5) No active todos.                      │
└──────────────────────────────────────────┘
```

1. Header: the app name.
2. Form: unchanged.
3. View picker: three toggle buttons, the current one pressed.
4. List: only the todos of the current view, in their saved order.
5. Empty message: names the current view when it has nothing to show; "Nothing to do yet." when the list itself is empty.

## Tasks to do

### `1)` View rules

> DOM-free view logic next to the todo rules.

1. In `src/todos.ts`, add a `TodoView` type (`all`, `active`, `done`) and `visibleTodos(todos, view)` that keeps order.
2. Cover each view and the order in `src/todos.test.ts`.

### `2)` Saved view

> The current view survives a reload.

1. In `src/storage.ts`, add `loadView(storage)` (falls back to `all` for a missing, unknown or unreadable value, or a throwing storage) and `saveView(storage, view)` (returns whether it saved), under their own key.
2. Cover them in `src/storage.test.ts`.

### `3)` View picker and filtered list

> The screen shows the picker and only the current view's todos.

1. In `src/main.ts`, render the three buttons with `aria-pressed`, start from `loadView`, save on change, render `visibleTodos`.
2. Show the empty message for the current view, keep "Nothing to do yet." for an empty list.
3. Switch to All when a todo is added while Done is current.
4. Pick the row to focus from the visible list, not the full list: after a tick that hides the row or a delete, the visible row now at that index, else the last visible row, else the input.
5. Never save the todos when only the view changes; a failed view save changes nothing on screen.
6. Style the picker in `src/style.css`.

### `4)` Record the change

> Memory, release notes and browser evidence.

1. Update `project-brief.md` key features; add a `minor` changeset written for a user.
2. Run the Test Scope in a browser and record it in `browser-check.md` beside this plan.

## Test acceptance criteria

| Task | Acceptance criteria                                                                                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | `visibleTodos` returns all, only not-done, or only done todos, in saved order                                                                                                                    |
| 2    | A saved view loads back; missing, unknown, unreadable or throwing storage loads `all`; a throwing save returns failure                                                                           |
| 3    | In the browser each button shows its view and is the only one pressed; an empty view names itself; adding in Done switches to All; ticking in Active removes the row and focus stays in the list |
| 3    | Choosing Done then reloading reopens Done with todos unchanged                                                                                                                                   |
| 3    | Deleting in a filtered view removes the todo and focus lands on a visible row or the input                                                                                                       |
| 3    | Switching views leaves the saved todos unchanged                                                                                                                                                 |
| 4    | `browser-check.md` records every Test Scope row on the validated commit; a `minor` changeset exists                                                                                              |
