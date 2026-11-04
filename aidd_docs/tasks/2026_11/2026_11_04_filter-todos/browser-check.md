# Browser check: Filter the todo list

- Date: 2026-11-04
- Commit: `feee6a3` (`fix: render a saved list without crashing on start`)
- Runtime: `vp dev --port 5198 --strictPort`, Chromium driven by Playwright
- Answers: the Test Scope of [`phase-1.md`](./phase-1.md); every row ran in one pass, from the setup to the teardown

| #   | Scenario                                                      | Observed                                                                                                    | Result |
| --- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------ |
| 0   | Setup: clear the site data, add `a`, `b`, `c`, tick `a`       | All pressed, shows `a` (done), `b`, `c`                                                                     | pass   |
| 1   | Choose Active, then Done, then All                            | `b`, `c`; then `a`; then `a`, `b`, `c`; only the chosen button has `aria-pressed="true"` each time          | pass   |
| 2   | In Active, tick `b` with Space (keyboard only)                | `b` leaves the view, focus lands on the checkbox of `c`; Done then shows `a`, `b`                           | pass   |
| 3   | In Done, untick `a` then `b` with Space, Done stays current   | Focus moves to `b`'s checkbox, then to the input; the view reads "No done todos.", not "Nothing to do yet." | pass   |
| 4   | With Done current, add `d`                                    | All pressed, list `a`, `b`, `c`, `d`, `d` last                                                              | pass   |
| 5   | Tick `b` and `d`, choose Done, Tab to "Delete b", press Enter | `b` disappears from the view and the saved list; focus lands on the checkbox of `d`                         | pass   |
| 6   | Click All, Active, Done, Active, All                          | The saved `aidd-todo-demo:todos` string is byte-for-byte identical before and after                         | pass   |
| 7   | Choose Done, reload                                           | Done pressed, shows `d` (done); the saved todos string is unchanged; `aidd-todo-demo:view` is `done`        | pass   |
| 8   | Save `{not a view` under `aidd-todo-demo:view`, reload        | All pressed, shows `a`, `c`, `d`                                                                            | pass   |
| -   | Teardown: clear the site data, reload                         | No rows, "Nothing to do yet.", All pressed, storage empty                                                   | done   |

Found on the first run, on `b2e0696`: any start with saved todos threw `ReferenceError: Cannot access 'EMPTY_VIEW' before initialization` and left the list blank, because the first render ran before the module-level constant was declared. Fixed in `feee6a3`; the run above is the full rerun on that commit, with no console error.

Not covered: a failed save of the view (a throwing `setItem` for the view key only; covered by unit tests, not on screen), a real screen reader announcing the pressed state, Safari and Firefox.
