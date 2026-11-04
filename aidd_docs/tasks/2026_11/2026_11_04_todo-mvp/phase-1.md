---
status: pending
---

# Instruction: Todo rules and saved list

## Architecture projection

```txt
.
├── vite.config.ts            ✏️
└── src/
    ├── todos.ts              ✅
    ├── todos.test.ts         ✅
    ├── storage.ts            ✅
    └── storage.test.ts       ✅
```

## Test Scope

| Scenario   | Action                                                         | Observable outcome                             | Actor  |
| ---------- | -------------------------------------------------------------- | ---------------------------------------------- | ------ |
| Setup      | Start from an empty list and an in-memory storage double       | No todo, nothing saved                         | system |
| Happy path | Add three todos, toggle one, remove another, save, load again  | Two todos, original order, same done states    | system |
| Edge case  | Add `""` or `"   "`                                            | The list is unchanged                          | system |
| Edge case  | Add `"  buy milk  "`                                           | One todo titled `buy milk`                     | system |
| Edge case  | Add the same title twice                                       | Two todos with distinct ids                    | system |
| Edge case  | Load from `not json`, `{}`, or an array with a malformed item  | An empty list                                  | system |
| Edge case  | Save into a storage whose `setItem` throws                     | The save reports failure, no exception escapes | system |
| Edge case  | Load from a storage whose `getItem` throws, or with no storage | An empty list, no exception escapes            | system |

## Tasks to do

### `1)` Todo rules

> Pure functions that turn a list and an action into the next list.

1. Create `src/todos.ts`: a `Todo` type (`id`, `title`, `done`), and `addTodo`, `toggleTodo`, `removeTodo` that never mutate their input.
2. `addTodo` trims the title, returns the same list for a blank title, and appends with a new id.
3. Cover every rule in `src/todos.test.ts`.

### `2)` Saved list

> Read and write the list through a storage passed in.

1. Create `src/storage.ts`: `browserStorage()` returns `window.localStorage`, or `null` when reaching it throws; `loadTodos(storage)` returns the saved list, or an empty list for a `null` storage, a throwing `getItem`, missing or unreadable data; `saveTodos(storage, todos)` returns `false` for a `null` storage or a throwing `setItem`, `true` otherwise.
2. Cover loading, unreadable data, a `null` storage and throwing `getItem` and `setItem` in `src/storage.test.ts`, with an in-memory storage double.

### `3)` Real tests replace the placeholder

> The suite now has tests, so it must fail when it finds none.

1. Remove `passWithNoTests` and its comment from `vite.config.ts`.

## Test acceptance criteria

| Task | Acceptance criteria                                                                                                                   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Adding three todos, toggling one and removing another leaves two todos in their original order with the expected done states          |
| 1    | A blank or whitespace-only title leaves the list unchanged; `"  buy milk  "` yields `buy milk`; the same title twice yields two todos |
| 2    | A saved list loads back identical; missing, invalid JSON or malformed data loads as an empty list                                     |
| 2    | A storage that throws on write makes the save return failure without throwing                                                         |
| 2    | A `null` storage or one that throws on read loads an empty list without throwing                                                      |
| 3    | `vp test` runs the new tests and `vite.config.ts` no longer sets `passWithNoTests`                                                    |
