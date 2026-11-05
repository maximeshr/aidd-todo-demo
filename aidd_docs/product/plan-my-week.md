---
objective: "A user of AIDD Todo sees at a glance what is due today or already late, so nothing they planned for the week slips."
revision: current
---

# Product Brief: Plan my week

AIDD Todo, the single-browser todo list of the AIDD training, keeps what to do but not when. This bet adds an optional due date and a way to see what is due today or overdue, at the stage of an MVP already shipped (add, complete, filter, clear done).

## Opportunity

Today a todo is a title and a done state, nothing else: the list cannot tell a user what needs doing today, and a todo that is late looks the same as one with no deadline. Due dates were deferred on purpose when the MVP was scoped. The alternative a user has is to write the day in the title ("Fri: call the plumber") and scan the whole list by eye, which gets worse as the list grows. Now, because the MVP is stable and the list filter already gives a place where a time-based view can live.

## Audience and Context

One person using the app in one browser to keep their personal list for the coming days. They open it once or a few times a day and want to know what to do now. No sharing, no account, no other device.

## Product Bet

If a todo can carry an optional due date and the user can see what is due today or overdue, they will plan the week by giving dates to the todos that have one, and stop missing the ones that are late. Todos without a date keep working exactly as today.

## Evidence and Assumptions

| Claim                                                                              | Status     | Basis or next check                                                                |
| ---------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| Due dates were left out of the MVP on purpose                                      | evidence   | `aidd_docs/tasks/2026_11/2026_11_04_todo-mvp/brainstorm.md`, out of scope list     |
| A todo holds only a title and a done state                                         | evidence   | `src/todos.ts`, `Todo` interface                                                   |
| The bet is due dates plus a due today or overdue view, not a calendar or week view | decision   | PO, framing answer (see `po-log.md`)                                               |
| Users write the day in the title to work around the gap                            | assumption | ask the next training cohort how they note a deadline today                        |
| Users will give a date to some todos, not all                                      | assumption | training session: three attendees plan a real week with the app                    |
| A due today or overdue view is enough to stop missed todos                         | assumption | same session: can each attendee name what is late without scanning the whole list? |
| There is no usage data: the app is local and sends nothing                         | evidence   | `aidd_docs/memory/deployment.md`, local only                                       |

## Boundaries

- Addresses: an optional due date on a todo; seeing what is due today or overdue.
- Leaves out: times of day, reminders and notifications, recurring todos, a calendar or week grid, sync across devices or browsers, priorities.

## Success

A user can tell what is due today and what is late in one look, without reading every todo, and a dated todo no longer slips past its day unnoticed. Value is earned when attendees keep dating some of their todos after the first session.

## Validation and Feedback

Next validation: a moderated session with three training attendees who plan their real week in the app; it targets the riskiest assumption, that people will date some todos and find the late ones without scanning. Post-use signal: issues and comments attendees file on the GitHub repository after the training, labelled by the PO and reviewed at the end of each training session. A pattern of "I still miss late todos" or "I never set a date" can drop or reshape the view before more date features are planned.

## Open Decisions

- Whether "this week" (beyond today) earns a view of its own: deferred until the validation session shows whether today and overdue are enough.
