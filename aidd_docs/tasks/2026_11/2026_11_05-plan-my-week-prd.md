# Plan my week

AIDD Todo gains an optional due date on a todo and a way to see what is due today or overdue, so a user stops missing what they planned for the week. Source: [Product Brief](../../product/plan-my-week.md).

## Overview

AIDD Todo is a single-browser todo list for one person. It keeps what to do but not when. The MVP left due dates out on purpose; it is now stable, and the list already has views (all, active, done) where a time-based view fits. This is for the user who plans the coming days in the app and opens it to know what to do now.

## Problem Statement

A user cannot tell which todos are due today, and a late todo looks the same as one with no deadline. The workaround, writing the day in the title, forces them to read the whole list to find what matters today, and late todos slip unnoticed as the list grows.

## Goals

- A user can give a todo a due date, or leave it without one.
- A user can see, in one view, every todo due today and every todo that is overdue, without reading the rest of the list.
- A user can tell a todo is overdue without opening or comparing anything.
- Todos without a due date behave exactly as they do today.

## Non-Goals

- Times of day: a due date is a day.
- Reminders, notifications, or anything that alerts the user outside the page.
- Recurring todos.
- A calendar, a week grid, or a "due this week" view (open decision in the brief).
- Sorting the whole list by date, priorities.
- Sync across browsers or devices.
- Refreshing the view by itself at midnight while the page stays open: it is right whenever the list is drawn.

## User Stories

- As a user planning my week, I want to give a todo a due date, so that I know when it has to be done.
- As a user, I want to see what is due today or overdue, so that I know what to do now.
- As a user, I want an overdue todo to stand out, so that I notice it before it slips further.
- As a user, I want to change or remove a todo's due date, so that my plan follows my week.

## Acceptance Criteria

- "Today" is the local date of the device showing the list. A due date is a calendar day, with no time.
- A todo can be added with or without a due date, including a date already past; a todo without one shows no date.
- A todo with a due date shows that date in the list.
- An active todo is due today when its date is today, and overdue when its date is before today. A done todo is neither, and keeps showing its date.
- A new view, next to all, active and done, shows every active todo due today or overdue, in the saved order, and no other todo. It is remembered across reloads like the other views.
- With nothing due today or overdue, the view says so, in words that name it.
- An overdue todo says "overdue" in words wherever it is shown, not by colour alone.
- A due date can be changed or removed on an existing todo.
- Due dates survive a reload in the same browser, like the rest of the list. A saved todo whose due date cannot be read loads without a due date; the rest of the list loads as usual.

## Dependencies

- The Product Brief's validation session with three attendees, to settle the "this week" open decision. It does not block the first release.
- The existing views (all, active, done) and the saved list: the new view and dates must fit them.

## Open Questions

- How a due date reads on screen (a calendar date, or a relative word such as "Tomorrow"): decided in the spec.
