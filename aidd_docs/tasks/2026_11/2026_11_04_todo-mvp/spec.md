# Todo list MVP

## Target

A single user can add, complete, un-complete and delete todos in their browser, and finds the same list after reloading the page.

## Hard constraints

- A todo has a title and a done state.
- A title is saved without its leading and trailing spaces.
- A title that is empty or only whitespace is rejected: the list does not change.
- Todos are shown in the order they were added.
- Duplicate titles are allowed.
- A done todo is shown struck through.
- A long title wraps inside the list and never widens the page.
- The list survives a page reload in the same browser.
- Saved data that cannot be read leads to an empty list, never to a broken page.
- When the list cannot be saved, the change stays on screen for the current visit and the user sees that it was not saved.
- No account, no server, no sync between devices or browsers.

## Non-goals

- Editing a todo's title.
- Filtering or sorting the list.
- Due dates, priorities, tags, reordering.
- A title length limit.
- Keeping several open tabs in sync while they are open: each tab shows the list as it was when the tab loaded.

## Done-when

- After adding three todos, marking one done and deleting another, a reload shows exactly the two remaining todos, in their original order, with the same done states.
- Submitting an empty or whitespace-only title leaves the list unchanged.
- Submitting `  buy milk  ` adds a todo titled `buy milk`.
- Adding the same title twice shows two todos.
- A todo marked done is struck through, and can be marked not done again.
- Starting with unreadable saved data shows an empty, usable list.
- When saving fails, the change is still visible and a message says the list was not saved.

## Open Questions

None

## Context

- Clarified need: [brainstorm.md](brainstorm.md).
- Gaps found and answered: [spec-shadow-report.md](spec-shadow-report.md).
