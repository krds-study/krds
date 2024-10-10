import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import nodeResolve from "@rollup/plugin-node-resolve";
import { readFileSync } from "fs";
import path from "path";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";

const pkg = JSON.parse(
  readFileSync(fileURLToPath(new URL("./package.json", import.meta.url))),
);

export default defineConfig([
  {
    input: ["src/index.ts"],
    output: [
      {
        format: "cjs",
        dir: path.dirname(pkg.main),
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true,
        entryFileNames: "[name].js",
        exports: "named",
      },
      {
        format: "esm",
        dir: path.dirname(pkg.module),
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true,
        entryFileNames: "[name].mjs",
        exports: "named",
      },
    ],
    external: [
      /@babel\/runtime/,
      /^@krds-prac\/styled-system/,
      "react/jsx-runtime",
    ],
    plugins: [
      peerDepsExternal(),
      commonjs({ include: /\**node_modules\**/ }),
      nodeResolve({ extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"] }),
      typescript({
        include: ["src/components/**/*"],
      }),
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
        include: ["src/**/*"],
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-transform-runtime"],
      }),
      visualizer({ filename: "stats.html" }),
      resolve(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
  // {
  //   input: "src/preset.ts",
  //   output: [
  //     { file: "dist/preset/index.js", format: "cjs" },
  //     {
  //       file: "dist/preset/index.mjs",
  //       format: "es",
  //     },
  //   ],
  //   external: [/@babel\/runtime/, /node_modules/, /^@krds-prac\/styled-system/],
  //   plugins: [dts(), json()],
  // },
]);
