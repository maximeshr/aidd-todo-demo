# Browser check: Todo list MVP

- Date: 2026-11-04
- Commit: `091a6bf` (`fix: keep keyboard focus and announce each failed save`)
- Runtime: `vp dev --port 5199`, Chromium driven by Playwright
- Answers: the review's unverified phase-2 criteria and the challenge's deal breaker (`review.md`, round 1)

| #   | Scenario                                                                 | Observed                                                                            | Result |
| --- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------ |
| 0   | Clear the site data, open the app                                        | Empty state visible                                                                 | pass   |
| 1   | Add three todos, tick the second, delete the first, reload               | `call the bank` done and struck through, `water the plants` not done, in that order | pass   |
| 1   | Focus after tick, then after delete                                      | Focus stays on `call the bank` both times                                           | pass   |
| 2   | Submit `"   "`                                                           | Still 2 todos                                                                       | pass   |
| 3   | Submit `"  buy milk  "`, then `"buy milk"`                               | Two todos titled `buy milk`                                                         | pass   |
| 4   | Submit `<b>x</b>`                                                        | Shown as the text `<b>x</b>`, no `<b>` element                                      | pass   |
| 5   | Untick a done todo                                                       | Not done, no strike-through                                                         | pass   |
| 6   | Submit 300 characters without spaces                                     | Title wraps, no horizontal scroll                                                   | pass   |
| 7   | Make `setItem` throw `QuotaExceededError`, add `save me`                 | `save me` shown, status reads "The list was not saved."                             | pass   |
| 8   | Save `{not json` under `aidd-todo-demo:todos`, reload, add `fresh start` | Empty state, then one todo `fresh start`                                            | pass   |
| -   | Teardown                                                                 | Site data cleared                                                                   | done   |

Not covered: a real screen reader (the status text change is checked, not its announcement), Safari and Firefox.
