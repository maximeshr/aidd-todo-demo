# Filter the todo list

## Target

The user can switch the todo list between three views (all, active, done) and every todo stays saved whatever the view.

## Hard constraints

- The views are "All", "Active" (not done) and "Done"; exactly one is current, and the current one is marked as such.
- The current view survives a reload in the same browser; a first visit, or a saved view that cannot be read, starts on "All".
- A view never changes the saved list, its order, or any done state.
- Ticking or unticking a todo in "Active" or "Done" removes it from that view immediately.
- An empty view shows a message naming that view, distinct from the message for an empty list.
- Adding a todo while "Done" is current switches to "All".
- Deleting a todo works in every view.

## Non-goals

- Counts of active or done todos.
- Removing all done todos at once.
- Putting the view in the URL, or sharing it across browsers.
- Keyboard shortcuts.

## Done-when

- With todos `a` (done), `b` and `c` (active): "Active" shows `b`, `c`; "Done" shows `a`; "All" shows `a`, `b`, `c` in that order.
- In "Active", ticking `b` removes it from the view; "Done" then shows `a`, `b`.
- With no done todo, "Done" shows a message for an empty done view, while an empty list still shows "Nothing to do yet."
- Adding `d` while "Done" is current shows "All" with `d` last.
- After choosing "Done" and reloading, the list opens on "Done" with every todo and done state unchanged.
- With a saved view that cannot be read, the list opens on "All".

## Open Questions

None

## Context

- Clarified need: [brainstorm.md](brainstorm.md).
- Builds on the todo list MVP: [../2026_11_04_todo-mvp/spec.md](../2026_11_04_todo-mvp/spec.md).
