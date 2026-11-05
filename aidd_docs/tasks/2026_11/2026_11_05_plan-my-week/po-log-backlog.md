# Step 13 log: plan my week, from PRD to ordered Stories

The assistant ran each skill; the training author played the product owner (PO). The backlog lives in GitHub Issues (`aidd_docs/memory/backlog.md`): the issues are the artifacts, this file records what was asked and decided.

## `/aidd-pm:07-epic` → [#1](https://github.com/maximeshr/aidd-todo-demo/issues/1)

Input: the PRD. The backlog was empty (`gh issue list`: no issue), so no match or overlap.

### Shape

- **Skill qualified:** one outcome (see what is due today or overdue) that needs several deliverable slices: an Epic.
- **Skill asked (highest gap, success evidence):** is the Epic done when its Stories ship, or when the outcome is observed?
- **PO:** only when the Product Brief's validation session shows three attendees naming what is late without scanning the list. Shipping alone proves delivery, not the outcome.

### Review

- **Skill challenged a claim of its own draft:** the Context said "users write the day in the title today" as a fact. The brief lists it as an **assumption**, unobserved. Rewritten as such ("Whether users will date their todos at all is an assumption").
- **PO refused one line:** the draft's Includes named "a Due button in the view bar". That is a screen decision, below Epic level. Replaced by "a view of what is due today or overdue, next to the existing views".
- Readiness: outcome, goal (the brief), context, boundaries, success, relations and unknowns all pass. **PO authorized:** persist as `ready`.

### Finalize

- Written with `gh issue create`: #1 `Epic: see what is due today or overdue`, labels `epic`, `status:ready`. `goal` and `source` in the body's `## Relations` (the brief and the PRD, never the same reference). No Markdown copy.
- Read back with `gh issue view 1`: title, labels and state match.
- Handoff offered by the skill: the outcome is settled enough to slice into Stories. **PO:** go.
