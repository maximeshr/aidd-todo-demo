# aidd-todo-demo

[![CI](https://github.com/maximeshr/aidd-todo-demo/actions/workflows/quality.yml/badge.svg?branch=canary)](https://github.com/maximeshr/aidd-todo-demo/actions/workflows/quality.yml)

A small todo list app, built step by step with the [AIDD framework](https://github.com/ai-driven-dev/framework) as the hands-on example of an AIDD training.

## Table of contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Training steps](#training-steps)
- [Contributing](#contributing)
- [License](#license)

## Background

The app is deliberately simple: the point is the method, not the code. Each key step of the AIDD workflow is one merge into `canary`, tagged `step-NN-<name>`, with the artifacts the AIDD skills produced (memory, spec, plan, review) committed under `aidd_docs/`.

| Area      | Choice                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| Framework | Vanilla TypeScript, no UI framework                                           |
| Tooling   | Vite+ (`vp`), pnpm, [quality-gate](https://github.com/maximeshr/quality-gate) |
| AI method | [AIDD framework](https://github.com/ai-driven-dev/framework), Claude Code     |
| Hosting   | None, local only                                                              |

## Install

Install [Vite+](https://viteplus.dev) once (`curl -fsSL https://vite.plus | bash`): it downloads the pnpm and Node.js versions pinned in `package.json` `devEngines`.

```sh
vp install        # dependencies and git hooks
```

## Usage

```sh
vp dev            # local server
vp check          # format, lint, types
vp test           # tests
vp run build      # production build
```

## Training steps

Check out a tag to see the project exactly as it was after that step: `git switch --detach step-04-plan`.

| Tag                 | AIDD step        | Command | What to look at                 |
| ------------------- | ---------------- | ------- | ------------------------------- |
| `step-00-bootstrap` | Project scaffold | none    | The bare project, before any AI |

## Contributing

Pull requests target `canary`. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © Maxime Sahroui
