# VCS

The version-control conventions this project follows: branches, commits, and the platform.

## Setup

- Main branch: `canary` is the default and integration branch; `main` is production and only receives the release pull request.
- Platform: `github`, public repository `maximeshr/aidd-todo-demo`
- Tickets: GitHub Issues on the same repository, read and written with `gh issue`. Conventions in `backlog.md`.
- Hooks: `pre-commit` runs `vp staged`; `commit-msg` runs commitlint; `pre-push` runs the full check, tests, dead code and duplication.

## Branches

- Format: `<type>/<short-name>`, branched from `canary`.
- Types in use: `feat`, `fix`, `docs`, `chore`, `ci`, `build`, `refactor`, `test`.
- Merged into `canary` with a merge commit only: no squash, no rebase merge.

## Commits

- Convention: Conventional Commits, checked by commitlint.
- Format: `type(scope): description`
- Rules: present tense, lowercase subject, one concern per commit.
- A user-facing change adds a changeset (`vp exec changeset`); `ci`, `build`, `test`, `docs` and `chore` changes need none.

## Commit Strategy

AI should auto commit: `after phase`
