#!/usr/bin/env node

import { program } from 'commander';
import { getFileData, genDiff } from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = getFileData(filepath1);
    const data2 = getFileData(filepath2);

    const diff = genDiff(data1, data2);
    console.log(diff);
  });

program.parse();
