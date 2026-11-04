import { defineQualityGate } from "quality-gate/vite";
import { defineConfig } from "vite-plus";

// OKQ base config (lint, fmt, test coverage, staged); only this app's structure is added here.
// AIDD writes these files itself (memory index, published rules): formatting them would undo it.
const qualityGate = defineQualityGate({
  ignore: ["aidd_docs/memory/README.md", ".claude/rules/**"],
});

export default defineConfig({
  ...qualityGate,
  test: {
    ...qualityGate.test,
    include: ["src/**/*.test.ts"],
  },
});
