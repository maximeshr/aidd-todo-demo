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

## `/aidd-pm:02-user-stories` on #1 → #2, #3, #4, #5

### Frame

- Actor (a user planning the week), need and outcome are explicit in #1 and the PRD; parent #1 confirmed. No question needed.

### Slice

- **Skill proposed** four slices by operation and rule: set a date (and see it), the due today or overdue view, the overdue mark, change or remove a date.
- **Skill asked (alternative slice that changes value):** should changing and removing a date ship with setting it, as one "manage a due date" Story?
- **PO:** no, keep it apart. Setting a date at creation already gives value; editing comes once people use dates.

### Write

- Four drafts shown. **PO refused one acceptance line:** Story "give a todo a due date" said "the date is shown as YYYY-MM-DD". The PO sent the date's form to the spec on purpose (PRD open question); a Story must not freeze it. Removed.
- **PO asked to move** "a done todo keeps showing its date" from the overdue Story to the due date Story: it is about showing a date, not about being late.

### Assess

- INVEST: each Story is independent apart from needing dates to exist, negotiable, valuable (sourced from the brief), small, testable. No project estimation scale, so Estimable passes by default.
- The date's form is open, but it is a design choice, not a blocking unknown: no Spike.
- **PO decided:** every Story stays `proposed` for now. The first one goes through Three Amigos before anyone calls it ready.

### Estimation

- Skipped: `backlog.md` names no scale.

### Order

- **Skill proposed:** set a date first (every other Story needs dates), then the overdue mark (smallest), then the view, then change or remove.
- **PO changed it:** the view moves before the overdue mark. The view is what the validation session tests ("name what is late without scanning"); the mark is a refinement. Approved order: #2, #3, #4, #5.

### Finalize

- **PO authorized** the write. `gh issue create` ×4, labels `story`, `status:proposed`, `source` to the PRD in `## Relations`.
- Parent: native sub-issues of #1, in the approved order (`gh api .../issues/1/sub_issues` → `[2,3,4,5]`).
- Dependency: #3, #4, #5 are natively "blocked by" #2 (`.../dependencies/blocked_by` → `[2]` each). Stored once, on the dependent; GitHub derives "blocking" on #2.
- No estimate, no Markdown copy.
- Handoff: refine the first Story before it is called ready. **PO:** Three Amigos on #2.

## `/aidd-pm:08-three-amigos` on #2

Full result and decisions: [`three-amigos-story-2.md`](three-amigos-story-2.md). Three lenses, all `revise`; two entailed amendments, three questions, one conflict on impact.

- Amendments F1 (day anchor) and F2 (lists saved before due dates) **accepted**.
- Questions answered: unreadable date = not a real calendar day, todo kept without its date; invalid date on add = not added, user told.
- Conflict settled by the PO: #2 stays `proposed` until the spec fixes the date's form.
- Two proposals **refused**: a browser check in the acceptance (Definition of Done, not Story), and a memory change (implementer's consequence).
- Applied through the Story owner's revise route: `gh issue edit 2`, body before → after in the git history of this log; labels unchanged (`story`, `status:proposed`). Read back: labels and 8 acceptance lines.
