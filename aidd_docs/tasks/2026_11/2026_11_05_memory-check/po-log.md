# Step 11 log: GitHub Issues as the ticketing tool

Skill: `/aidd-context:02-project-memory refresh` (scan, check, write). The assistant ran the skill; the training author played the product owner (PO) and answered its questions.

## Scan

The scan summary the skill showed:

| Capability | Holds because                                  |
| ---------- | ---------------------------------------------- |
| core       | always                                         |
| ecosystem  | always                                         |
| deployment | `.github/workflows/quality.yml`, `release.yml` |

| Tool           | Human | Agent | Owned by        |
| -------------- | ----- | ----- | --------------- |
| GitHub         | cli   | cli   | `vcs.md`        |
| GitHub Actions | none  | none  | `deployment.md` |
| Dependabot     | none  | none  | `ecosystem.md`  |

- **Skill asked:** the repo proves no ticketing tool (no issue template, no tracker label, `vcs.md` says "Tickets: none"). Is a tracker in use, who reaches it, and how?
- **PO answered:** yes, GitHub Issues on `maximeshr/aidd-todo-demo`, from now on the single home of the product backlog. Humans and agents both reach it with the `gh` CLI. No GitHub Project board, no milestones, no estimation scale: the backlog is small and ordered by hand.
- **Result:** `backlog` capability added on the user's word; GitHub counted twice in the ecosystem (VCS and tracker).

## Check

Report: [`report.md`](report.md). The skill asks for one reviewer per memory file in parallel; with eight files of under 30 lines each, the assistant reviewed them in one pass instead, against the code and `gh`. Same protocol, no sub-agents.

- **Skill asked:** which findings to apply?
- **PO decided:**
  - `backlog.md` missing: **apply**. Fill it with the conventions below.
  - `vcs.md` "not published yet": **apply**, it is stale and misleads any skill that reads the platform.
  - `vcs.md` "Tickets: none": **apply**.
  - `ecosystem.md` tracker node: **apply**.
  - `architecture.md` save status module: **refused for this step**. True, but unrelated to ticketing; one concern per merge. Left for a later memory refresh.

## Backlog conventions (PO answers folded into `backlog.md`)

The AIDD backlog skills (epic, stories, spike, defect, task) write Markdown only; any other support is "a project's own integration". So the project memory has to say how each artifact maps onto GitHub, or the skills fall back to `aidd_docs/backlog/`.

- **Asked:** one support or two? **PO:** GitHub Issues only. No Markdown copy under `aidd_docs/backlog/`: one authority per artifact. Task folders keep the PO logs and link to the issues.
- **Asked:** how is the artifact type represented (personal repos have no native issue types)? **PO:** one label per type: `epic`, `story`, `task`, `defect`, `spike`.
- **Asked:** how is the lifecycle status represented? **PO:** a `status:*` label while the issue is open; `done` and `resolved` close it as completed, `cancelled` closes it as not planned. GitHub's own "open" is not a status.
- **Asked:** parent and dependency? **PO:** parent is a native sub-issue; a dependency is a native "blocked by" link. Source, goal and other relations are a `## Relations` list in the body, with stable paths or issue numbers.
- **Asked:** priority, estimation, iteration? **PO:** no scale and no iteration. Order among siblings is the native sub-issue order; order across top-level items is decided in the backlog review.
- **Refused:** the default labels `bug` and `enhancement` as artifact types. They overlap `defect` and `story` and would give an item two types; they stay unused by the skills.

## Labels created on GitHub

`gh label create`, verified with `gh label list`: `epic`, `story`, `task`, `spike`, `defect`, and `status:proposed`, `status:ready`, `status:in-progress`, `status:reported`, `status:open`, `status:blocked`, `status:inconclusive`.

## Wiring

The refresh path ends at write, but a new memory file must reach the context block. The assistant ran the skill's own hook script (`hooks/update_memory.js claude`, exit `0`): `CLAUDE.md` and `memory/README.md` gained `backlog.md`, nothing else changed.
