# Coding Assertions

The checks that must pass for code to count as done. Minimal, run after every change.

## Before commit

The fast gate, run by the `pre-commit` hook on staged files.

| Order | Command                          | Checks              |
| ----- | -------------------------------- | ------------------- |
| 1     | `vp check --fix --deny-warnings` | format, lint, types |

## Before push

The heavier gate, run by the `pre-push` hook.

| Order | Command                            | Checks                         |
| ----- | ---------------------------------- | ------------------------------ |
| 1     | `vp check --deny-warnings`         | format, lint, types            |
| 2     | `vp test`                          | tests                          |
| 3     | `vp exec quality-gate deadcode`    | dead code, unused dependencies |
| 4     | `vp exec quality-gate duplication` | duplication under 5 %          |

`vp exec quality-gate report` runs every gate at once, the build included, and writes `quality-report.md`.

## Behavior

If a fix is needed, spawn 1 agent per failing assertion to fix it (for example typechecking, tests, duplication = 3 agents). Fix the project, never the shared base config.
