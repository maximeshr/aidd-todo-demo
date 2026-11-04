---
source: aidd_docs/tasks/2026_11/2026_11_04_todo-mvp/spec.md
generated_at: 2026-11-04T08:20:00+01:00
status: clean
---

# Shadow Areas Report

Source: `aidd_docs/tasks/2026_11/2026_11_04_todo-mvp/spec.md`
Generated: `2026-11-04T08:20:00+01:00`

Total gaps: 1 | Blocker: 0 | Major: 0 | Minor: 1

---

## Gaps by Category

### ambiguous term

#### Closed

**[minor]** Is a title saved exactly as typed, or without its leading and trailing spaces?

> A title that is empty or only whitespace is rejected: the list does not change.

#### Newly Introduced

**[minor]** Does the not-saved message stay visible until the next successful save, or disappear after a moment?

> When the list cannot be saved, the change stays on screen for the current visit and the user sees that it was not saved.

### missing edge case

#### Closed

**[major]** What should a second tab of the same browser show after the list changes in the first tab?

> The list survives a page reload in the same browser.

**[minor]** How should a very long title without spaces be displayed?

> A title length limit.

### missing failure mode

#### Closed

**[major]** What should the user see when the list cannot be saved, for example when browser storage is full or disabled?

> The list survives a page reload in the same browser.

### missing acceptance criterion

#### Closed

**[minor]** Which observable condition proves that two todos with the same title can coexist?

> Duplicate titles are allowed.
