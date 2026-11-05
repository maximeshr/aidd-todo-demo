# Step 12 log: plan my week, from opportunity to PRD

The assistant ran each skill; the training author played the product owner (PO). Every question a skill asked, and the PO's answer, in order.

## `/aidd-pm:06-product-brief`

Input: "Plan my week: todos with an optional due date, and a way to see what is due today or overdue."

### Frame

- Evidence inspected first: `project-brief.md` (product, features), `src/todos.ts` (a todo is a title and a done state), the MVP brainstorm (due dates out of scope on purpose).
- **Skill asked:** "Plan my week" can mean two different products: due dates with a today and overdue view, or a week planner (a grid of days you drag todos into). Which one?
- **PO:** due dates and a today or overdue view. No week grid: it is a different product and far bigger.
- **Skill asked:** external research (competitor todo apps) could support claims about common patterns, but not about this app's users. Run it?
- **PO:** no. Competitors would only tell us what others ship, and the open questions are about our own users.
- **Skill asked:** where should the brief live? The app already has a project brief in memory.
- **PO:** a separate Product Brief for this bet, `aidd_docs/product/plan-my-week.md`. The memory brief describes the whole app and is not a product bet.

### Discover

- **Skill asked:** who is the user and what do they do today instead?
- **PO:** one person, one browser, personal list. Today they would write the day in the title. Recorded as an **assumption**: nobody has observed it.
- **Skill challenged:** the name says "week" but the bet only covers today and overdue. Is a "due this week" view part of the bet?
- **PO:** not now. Kept as an open decision, settled by the validation session. The name stays: it is the user's goal, not the feature list.
- **Skill asked:** how will we know it worked? There is no analytics.
- **PO:** a moderated session with three training attendees, then GitHub issues from attendees after the training.

### Visualize

- **Skill offered:** an ASCII wireframe of the list with a due today or overdue view.
- **PO:** skipped. A screen drawing at this stage turns into requirements; the PRD and spec come next.

### Shape and finalize

- First draft shown. **PO refused two things:**
  1. Success was "60 % of open todos carry a due date after two weeks". Refused: the app is local only and sends nothing, so that number can never be measured. Replaced by an observable session outcome and a post-use signal we can actually collect (issues from attendees).
  2. Boundaries listed "a reminder when a todo becomes due" as addressed. Refused: a reminder needs notifications, which is a new permission and a new product surface. Moved to "Leaves out".
- Second draft: **PO approved** and authorized persisting it.
- Written: `aidd_docs/product/plan-my-week.md`, `revision: current`, no relation fields (first brief). Read back: frontmatter `objective` non-empty, every template section present except the empty optional `Product View`.
- Handoff offered by the skill: the brief is one outcome needing several slices (Epic) and has no requirements yet (PRD). **PO:** PRD first, then the Epic in the next step.

## `/aidd-pm:03-prd`

Input: the Product Brief.

- First draft shown. **PO corrections:**
  1. The draft's Acceptance Criteria said "the due today or overdue view lists todos sorted by due date, earliest first". Refused as written: sorting is a Non-Goal of the brief for the whole list, and inside the new view the order is a product choice nobody has made yet. **PO decided:** keep the saved order everywhere, as the other views do; the sorting line was removed and "sorting the whole list by date" stayed a Non-Goal.
  2. The draft had no criterion for changing or removing a date. **PO added** the story and its criterion: a plan changes during the week.
- **Skill noted a tension, PO decided:** the PRD template has a "User Stories" section while the skill's own rule says "never user stories". The PO kept the section as one-line needs only, with no acceptance per story: the Stories proper come from `/aidd-pm:02-user-stories` in the next step.
- Second draft: **PO approved.** Saved at the path the skill fixes: `aidd_docs/tasks/2026_11/2026_11_05-plan-my-week-prd.md`. Note: that is a file beside the month folders, not inside the `2026_11_05_plan-my-week/` task folder, and it uses `-` where the spec skill uses `_`. The PO kept the skill's path rather than bend the skill; the task folder links to it.
- Read back: eight template sections, no tech stack, data model or code.
