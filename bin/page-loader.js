#!/usr/bin/env node

import { Command } from "commander";
import { pageLoader } from "../src/index.js";

const program = new Command();

program
  .name("page-loader")
  .description("CLI to some JavaScript string utilities")
  .arguments("<url>")
  .version("0.8.0", "V", "--version", "output the version number")
  .option("-o, --output [dir]", "output dir", process.cwd())
  .action(async (url, options) => {
    const dir = options.output;
    const result = await pageLoader(url, dir)

    console.log(result);
  });

program.parse();
