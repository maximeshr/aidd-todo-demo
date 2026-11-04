---
source: aidd_docs/tasks/2026_11/2026_11_04_todo-mvp/spec.md
generated_at: 2026-11-04T08:05:00+01:00
---

# Shadow Areas Report

Source: `aidd_docs/tasks/2026_11/2026_11_04_todo-mvp/spec.md`
Generated: `2026-11-04T08:05:00+01:00`

Total gaps: 5 | Blocker: 0 | Major: 2 | Minor: 3

---

## Gaps by Category

### ambiguous term

**[minor]** Is a title saved exactly as typed, or without its leading and trailing spaces?

> A title that is empty or only whitespace is rejected: the list does not change.

### missing edge case

**[major]** What should a second tab of the same browser show after the list changes in the first tab?

> The list survives a page reload in the same browser.

**[minor]** How should a very long title without spaces be displayed?

> A title length limit.

### missing failure mode

**[major]** What should the user see when the list cannot be saved, for example when browser storage is full or disabled?

> The list survives a page reload in the same browser.

### missing acceptance criterion

**[minor]** Which observable condition proves that two todos with the same title can coexist?

> Duplicate titles are allowed.
