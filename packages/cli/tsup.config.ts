import fs from "fs-extra";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  minify: true,
  async onSuccess() {
    await fs.copy("../ui/src/components", "./dist/components");
  },
});
