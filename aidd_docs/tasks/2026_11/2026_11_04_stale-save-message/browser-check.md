# Browser check: stale not-saved message

- Date: 2026-11-04
- Commit: the fix commit on `fix/stale-save-message` (working tree validated before committing)
- Runtime: `vp dev --port 5199`, Chromium driven by Playwright

| #   | Scenario                                                                                            | Observed                                                 | Result |
| --- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------ |
| 1   | Make `setItem` throw, add `first`                                                                   | Status reads "The list was not saved."                   | pass   |
| 2   | In one frame: submit `fails` with saving broken, restore saving, submit `succeeds`; wait two frames | Status empty; storage holds `first`, `fails`, `succeeds` | pass   |
| 3   | Reload                                                                                              | The three todos come back                                | pass   |
| 4   | Tick the first todo with the keyboard focus rule in place                                           | Focus stays on `first`                                   | pass   |

Not covered: a real screen reader, Safari and Firefox.
