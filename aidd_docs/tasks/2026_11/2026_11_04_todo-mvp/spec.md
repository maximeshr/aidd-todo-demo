# Todo list MVP

## Target

A single user can add, complete, un-complete and delete todos in their browser, and finds the same list after reloading the page.

## Hard constraints

- A todo has a title and a done state.
- A title that is empty or only whitespace is rejected: the list does not change.
- Todos are shown in the order they were added.
- Duplicate titles are allowed.
- The list survives a page reload in the same browser.
- Saved data that cannot be read leads to an empty list, never to a broken page.
- No account, no server, no sync between devices or browsers.

## Non-goals

- Editing a todo's title.
- Filtering or sorting the list.
- Due dates, priorities, tags, reordering.
- A title length limit.

## Done-when

- After adding three todos, marking one done and deleting another, a reload shows exactly the two remaining todos, in their original order, with the same done states.
- Submitting an empty or whitespace-only title leaves the list unchanged.
- A todo marked done can be marked not done again.
- Starting with unreadable saved data shows an empty, usable list.

## Open Questions

- TBD: Should a done todo look different beyond its checked state (struck through, dimmed), or is the checked state enough?

## Context

- Clarified need: [brainstorm.md](brainstorm.md).
