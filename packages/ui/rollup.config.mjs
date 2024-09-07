import { readFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import { defineConfig } from "rollup"
import babel from "@rollup/plugin-babel"
import { DEFAULT_EXTENSIONS } from "@babel/core"
import nodeResolve from "@rollup/plugin-node-resolve"
import { visualizer } from "rollup-plugin-visualizer"
import dts from "rollup-plugin-dts"

const pkg = JSON.parse(readFileSync(fileURLToPath(new URL("./package.json", import.meta.url))))

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        format: "cjs",
        dir: path.dirname(pkg.main),
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true,
        entryFileNames: "[name].js",
      },
      {
        format: "esm",
        dir: path.dirname(pkg.module),
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true,
        entryFileNames: "[name].mjs",
      },
    ],
    external: [/@babel\/runtime/],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      nodeResolve({ extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"] }),
      typescript({ tsconfig: "./tsconfig.json" }),
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-transform-runtime"],
      }),
      visualizer({ filename: "stats.html" }),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
])
