import { DEFAULT_EXTENSIONS } from "@babel/core";
import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import nodeResolve from "@rollup/plugin-node-resolve";
import { readFileSync } from "fs";
import path from "path";
import { defineConfig } from "rollup";
import nodeExternals from "rollup-plugin-node-externals";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";

const pkg = JSON.parse(
  readFileSync(fileURLToPath(new URL("./package.json", import.meta.url))),
);

const rootDir = fileURLToPath(new URL(".", import.meta.url));

/**
 * @type {import('rollup').PluginImpl}
 */
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
    external: [],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      nodeExternals({
        deps: false,
        peerDeps: true,
        packagePath: "./package.json",
      }),
      nodeResolve({ extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"] }),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      alias({
        entries: [
          {
            find: "@styled-system",
            replacement: path.join(rootDir, "./styled-system"),
          },
        ],
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        extensions: DEFAULT_EXTENSIONS,
      }),
      visualizer({ filename: "stats.html" }),
    ],
  },
]);
