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
