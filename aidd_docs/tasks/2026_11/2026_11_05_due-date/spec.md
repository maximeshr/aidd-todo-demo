# Give a todo a due date

## Target

The user can give a new todo an optional due date, a calendar day, and sees that day on the todo in every view, across reloads.

## Hard constraints

- The due date is optional: adding a todo without one works exactly as today.
- A due date is a calendar day, with no time, in the local date of the device: the day shown is the day entered, whatever the device's time zone.
- A date already past is accepted.
- A date that is not valid or is incomplete blocks the add: the todo is not added, the typed title and date stay, and the user is told the date is not valid.
- The due date is saved with the todo as a `YYYY-MM-DD` string next to its title.
- A todo saved before due dates existed loads without a due date and behaves as today.
- A saved due date that is not a real calendar day loads as no due date; the todo keeps its title and done state, and the rest of the list loads.
- A done todo keeps showing its date.

## Non-goals

- Changing or removing the date of an existing todo (Story #5).
- The due today or overdue view (#3) and the overdue mark (#4).
- Times of day, reminders, recurring todos, sorting by date.

## Done-when

- Adding "Call the plumber" with Friday 7 November 2026 shows it with that day in all, active and done views, and again after a reload.
- Adding a todo with no date shows no date, as today.
- On a device set to a time zone west of UTC, the day shown is the day entered.
- With an invalid date entered, nothing is added and the user is told; title and date are still typed.
- A list saved before this change loads complete, every todo without a date.
- A saved list where one todo's date is 30 February loads every todo, that one without a date.

## Open Questions

- TBD: How does a due date read on screen: a calendar date (which parts: weekday, day, month, year?) or a relative word such as "Tomorrow"?

## Stakeholders

- Decider: the product owner of AIDD Todo
- Consumer: the user planning their week

## Context

- Story: [#2](https://github.com/maximeshr/aidd-todo-demo/issues/2), parent Epic [#1](https://github.com/maximeshr/aidd-todo-demo/issues/1).
- PRD: [../2026_11_05-plan-my-week-prd.md](../2026_11_05-plan-my-week-prd.md); refinement: [../2026_11_05_plan-my-week/three-amigos-story-2.md](../2026_11_05_plan-my-week/three-amigos-story-2.md).
