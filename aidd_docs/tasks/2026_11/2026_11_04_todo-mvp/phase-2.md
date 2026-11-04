---
status: pending
---

# Instruction: Todo screen

## Architecture projection

```txt
.
├── .changeset/
│   └── todo-list-mvp.md      ✅
├── aidd_docs/memory/
│   ├── architecture.md       ✏️
│   └── project-brief.md      ✏️
└── src/
    ├── main.ts               ✏️
    └── style.css             ✏️
```

## Test Scope

| Scenario   | Action                                                                                                                                    | Observable outcome                                           | Actor   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| Setup      | `vp dev`, open the local URL, clear the site data                                                                                         | The empty state shows                                        | browser |
| Happy path | Add three todos, tick one, delete another, reload                                                                                         | The two remaining todos, in order, with the same done states | browser |
| Edge case  | Submit an empty or whitespace-only title                                                                                                  | Nothing is added                                             | browser |
| Edge case  | Tick a todo, then untick it                                                                                                               | It is struck through, then shown normally again              | browser |
| Edge case  | Add a title of 300 characters without spaces                                                                                              | It wraps inside the list; the page does not scroll sideways  | browser |
| Edge case  | In the devtools console run `Storage.prototype.setItem = () => { throw new DOMException("full", "QuotaExceededError") }`, then add a todo | The todo shows, and a message says the list was not saved    | browser |
| Edge case  | Start with unreadable saved data under the app's storage key                                                                              | An empty, usable list                                        | browser |
| Teardown   | Clear the site data                                                                                                                       | Back to the empty state                                      | browser |

## Wireframe

```txt
┌──────────────────────────────────────────┐
│ (1) AIDD Todo                             │
├──────────────────────────────────────────┤
│ (2) [ What needs to be done?    ] [Add]   │
├──────────────────────────────────────────┤
│ (3) ☐ buy milk                     [×]    │
│     ☑ ~~call the bank~~            [×]    │
│     ☐ a very long title that wraps        │
│       onto the next line           [×]    │
├──────────────────────────────────────────┤
│ (4) The list was not saved.               │
└──────────────────────────────────────────┘
```

1. Header: the app name.
2. Form: the title field and the add button; Enter submits.
3. List: one row per todo, checkbox, title (struck through when done), delete button; the empty-state line when there is none.
4. Status: shown only after a save failed.

## Tasks to do

### `1)` Render and wire the screen

> `src/main.ts` renders the form, the list and the status, and connects them to the phase 1 functions.

1. Get the storage once with `browserStorage()` and load the list with `loadTodos` at start.
2. On submit, add the todo, re-render, save, and clear the field when a todo was added.
3. On checkbox change and delete click, update the list, re-render, save.
4. Show the not-saved status when `saveTodos` returns failure, hide it after a successful save.
5. Render titles as text, never as HTML.

### `2)` Style the states

> Done todos and long titles look as the spec says.

1. In `src/style.css`, strike through a done todo's title and let long titles wrap anywhere.

### `3)` Record the change

> Memory and release notes describe the shipped app.

1. Update `architecture.md` (flow with `todos.ts` and `storage.ts`, drop the `passWithNoTests` decision) and `project-brief.md` (key features).
2. Add a `minor` changeset that describes the todo list for a user.

## Test acceptance criteria

| Task | Acceptance criteria                                                                                                           |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1    | In the browser, three adds, one tick, one delete and a reload show the two remaining todos in order with the same done states |
| 1    | A blank title adds nothing; a title containing `<b>x</b>` shows those characters as text                                      |
| 1    | With saving made to fail, an added todo still shows and the not-saved message appears                                         |
| 2    | A done todo is struck through; a 300-character title without spaces wraps and the page has no horizontal scroll               |
| 3    | `architecture.md` no longer mentions `passWithNoTests`; a `minor` changeset exists with a summary written for a user          |
