import { defineQualityGate } from "quality-gate/vite";
import { defineConfig } from "vite-plus";

// OKQ base config (lint, fmt, test coverage, staged); only this app's structure is added here.
// The AIDD memory hook writes the memory index: formatting it would undo the hook on every session.
const qualityGate = defineQualityGate({ ignore: ["aidd_docs/memory/README.md"] });

export default defineConfig({
  ...qualityGate,
  test: {
    ...qualityGate.test,
    include: ["src/**/*.test.ts"],
  },
});
