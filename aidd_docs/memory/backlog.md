# Backlog

## Supports

| Support                                   | Authority for                               | Role                             |
| ----------------------------------------- | ------------------------------------------- | -------------------------------- |
| GitHub Issues, `maximeshr/aidd-todo-demo` | every Epic, Story, Task, Spike and Defect   | the only backlog; read with `gh` |
| `aidd_docs/product/`, `aidd_docs/tasks/`  | Product Briefs, PRDs, specs, plans, PO logs | the documents an issue links to  |

No Markdown copy of an issue under `aidd_docs/backlog/`: one authority per artifact.

## Representation

| Artifact | Support       | Native representation |
| -------- | ------------- | --------------------- |
| Epic     | GitHub Issues | label `epic`          |
| Story    | GitHub Issues | label `story`         |
| Task     | GitHub Issues | label `task`          |
| Spike    | GitHub Issues | label `spike`         |
| Defect   | GitHub Issues | label `defect`        |

The default labels `bug` and `enhancement` are not artifact types.

## Workflow

| Support       | Native status                 | Meaning                                  |
| ------------- | ----------------------------- | ---------------------------------------- |
| GitHub Issues | open + `status:<state>` label | any non-terminal state of the artifact   |
| GitHub Issues | closed as completed           | `done`, or `resolved` for a Spike        |
| GitHub Issues | closed as not planned         | `cancelled`, reason in a closing comment |

Status labels: `status:proposed`, `status:ready`, `status:in-progress`, `status:reported` (Defect), `status:open`, `status:blocked`, `status:inconclusive` (Spike).

## Planning

- Priority: none; order decides.
- Estimation: none.
- Iteration: none.
- Milestone: none.

## Relations

- Parent: native sub-issue; sibling order is the sub-issue order.
- Dependency: native "blocked by" link.
- Cross-support: a `## Relations` list in the issue body (`source`, `goal`, `related_to`, `supersedes`) with project-relative paths or issue numbers.
