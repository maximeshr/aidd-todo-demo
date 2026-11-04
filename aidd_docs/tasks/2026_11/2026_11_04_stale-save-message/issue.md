# Bug: the not-saved message stays after a successful save

- Found by: the second independent review round of the todo list MVP (`../2026_11_04_todo-mvp/review.md`, finding at `src/main.ts:73`).
- Symptom: a failed save followed by a successful save before the next animation frame leaves "The list was not saved." on screen, although the list was saved.
- Trigger: two saves inside one frame, the first failing, the second succeeding.
- Expected: after a successful save, no not-saved message, whatever came before.
- Root cause (hypothesis): `announceSave` schedules the failure text with `requestAnimationFrame` and never cancels the pending frame, so a later success cannot stop it.
- Fix branch: `fix/stale-save-message`. No ticketing tool: this file is the ticket.
