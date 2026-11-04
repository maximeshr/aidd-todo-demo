---
status: approved
---

# Todo list MVP

A single person keeps a short list of things to do in their browser, so they can jot a task down, tick it off, and find the list as they left it.

## Clear

- One user, one browser, no account and no sync between devices.
- The user adds a todo by typing a title and pressing Enter or the add button.
- A blank or whitespace-only title is rejected; nothing is added.
- Each todo can be marked done and back to not done, and can be deleted.
- Todos keep the order they were added in.
- The list survives a page reload.
- Out of scope for this version: editing a title, filters, due dates, priorities, reordering.
- Done when: add three todos, mark one done, delete another, reload, and the page shows the same two todos with the same done states.

## Assumed

- Duplicate titles are allowed: two errands can share a name.
- Unreadable saved data starts an empty list instead of breaking the page, since the data is only a personal list.
- Titles have no length limit for now; the list is personal and short.

## Open

- Should a done todo look different beyond its checkbox (struck through, dimmed)?
