# Testing

How the project is tested: the layers, the tools, and the conventions. Where tests live and how to run them.

## Strategy

- Unit tests on the todo logic, kept free of the DOM so it is testable without a browser.

## Tools

- Vitest through `vp test`, with V8 coverage from the shared base config.

## Conventions

- Tests sit next to the code as `src/**/*.test.ts`, the only path the config includes.
- Import test helpers from `vite-plus/test`.

## Run

- `vp test`, or `vp test --coverage` for the report.

## Browser QA

- Entry: `vp dev`, then the local URL it prints.
- Auth: none.
- State: browser storage only; clear the site data to reset.
