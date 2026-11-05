---
source: aidd_docs/tasks/2026_11/2026_11_05-plan-my-week-prd.md
generated_at: 2026-11-05T10:05:00+01:00
---

# Shadow Areas Report

Source: `aidd_docs/tasks/2026_11/2026_11_05-plan-my-week-prd.md`
Generated: `2026-11-05T10:05:00+01:00`

Total gaps: 10 | Blocker: 1 | Major: 6 | Minor: 3

---

## Gaps by Category

### unstated assumption

**[major]** Does the due today or overdue view change by itself when midnight passes while the page stays open?

> The due today or overdue view shows every active todo whose date is today or earlier, and no other todo.

### ambiguous term

**[blocker]** Is a todo due today already "overdue", or only once its day has passed?

> An overdue todo is marked as overdue wherever it is shown.

**[major]** Which calendar day counts as "today": the local date of the device showing the list?

> What is "today": the day on the user's device clock?

**[minor]** Which form does a shown due date take: a calendar date, or a relative word such as "Tomorrow"?

> A todo with a due date shows that date in the list.

### missing edge case

**[major]** Is a done todo whose due date has passed marked as overdue?

> An overdue todo is marked as overdue wherever it is shown.

**[major]** How does the due today or overdue view sit with the all, active and done views: is it one more view, remembered across reloads like them?

> The existing views (all, active, done) and the saved list: the new view and dates must fit them.

**[minor]** Can a todo be added with a due date that is already in the past?

> A todo can be added with or without a due date; a todo without one shows no date.

**[minor]** What does the due today or overdue view show when nothing is due today or late?

> The due today or overdue view shows every active todo whose date is today or earlier, and no other todo.

### missing failure mode

**[major]** What happens to the saved list when one saved todo carries a due date that cannot be read?

> Due dates survive a reload in the same browser, like the rest of the list.

### missing acceptance criterion

**[major]** How can a user who does not see colour tell that a todo is overdue?

> An overdue todo is marked as overdue wherever it is shown.
