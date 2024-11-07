#!/usr/bin/env node

import * as p from "@clack/prompts";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { copyComponent } from "./copyComponent";
import { getConfig } from "./getConfig";

const main = async () => {
  await yargs(hideBin(process.argv))
    .command(
      "add [components..]",
      "Add components to your project",
      yargs => {
        return yargs.positional("components", {
          describe: "List of components to add",
          type: "string",
          array: true,
          default: [],
        });
      },
      async argv => {
        if (argv.components.length === 0) {
          //컴포넌트 지정하지 않을 시 에러 메시지 출력
          p.cancel("Error: You need to specify at least one component");
          return;
        }
        const config = await getConfig();
        if (argv.components[0]) {
          await copyComponent(argv.components[0], config.outputPath);
        } else {
          p.cancel("Error: Invalid component name");
        }
      },
    )
    .strict()
    .help()
    .demandCommand(1, "You need at least one command before moving on").argv;
};

main();
