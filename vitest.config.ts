import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./packages/infrastructure/tests/setup.ts"],
  },
});
