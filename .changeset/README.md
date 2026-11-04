# Changesets

Describe user-facing changes with `vp exec changeset`. The release workflow turns pending changesets into a `canary` → `main` release pull request; merging it versions the app, updates `CHANGELOG.md` and tags the release. Nothing is published to npm.
