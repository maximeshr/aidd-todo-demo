# Deployment

Where the project runs and how it ships: CI/CD, environments, and release.

## Pipeline

- GitHub Actions, through the shared OKQ reusable workflows (`.github/workflows/`).
- `quality.yml`: one quality report per pull request into `canary`, and the changeset check.
- `release.yml`: a push to `canary` opens or updates the `canary` → `main` release pull request; a push to `main` versions, updates `CHANGELOG.md`, tags and creates the GitHub release. Nothing is published to npm.
- `audit.yml`: a weekly `pnpm audit`.

## Environments

- Local only: `vp dev`. The app is not hosted.

## Release

- The maintainer merges the release pull request into `main` with a merge commit. Versions and tags are never edited by hand.
