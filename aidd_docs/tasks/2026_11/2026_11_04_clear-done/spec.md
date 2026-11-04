# Clear done todos

## Target

The user removes every done todo at once with one button, and the remaining todos stay saved in their order.

## Hard constraints

- A "Clear done" button removes every done todo from the saved list in one action; active todos keep their order and state.
- The button is shown only while at least one todo is done, whatever the current view.
- No confirmation step, as for deleting a single todo.
- After clearing, focus goes to the new todo input, since the button disappears.
- After clearing, the current view stays as it was and shows its own empty message when it has nothing left.
- A failed save after clearing shows the existing not-saved message, and the cleared list stays on screen.

## Non-goals

- Undo.
- Clearing only the todos of the current view.
- A count of done todos on the button.

## Done-when

- With `a` (done), `b`, `c` (done), `d`: clicking "Clear done" leaves `b`, `d` in that order, and a reload shows the same.
- With no done todo, no "Clear done" button is shown; ticking one shows it.
- In the "Done" view, clearing shows that view's empty message and moves focus to the input.
- With saving made to fail, clearing still removes the done todos on screen and the not-saved message appears.

## Open Questions

None

## Context

- Request: "Add a button that removes all done todos at once." Run in `auto` mode: the decisions above were taken by the orchestrator, not asked.
- Builds on [../2026_11_04_filter-todos/spec.md](../2026_11_04_filter-todos/spec.md), which listed this as a non-goal.
