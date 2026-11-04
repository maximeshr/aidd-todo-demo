import { qualityGate } from "quality-gate/vite";
import { defineConfig } from "vite-plus";

// OKQ base config (lint, fmt, test coverage, staged); only this app's structure is added here.
export default defineConfig({
  ...qualityGate,
  test: {
    ...qualityGate.test,
    include: ["src/**/*.test.ts"],
    // The scaffold has no logic to test yet; the first feature brings the first tests.
    passWithNoTests: true,
  },
});
