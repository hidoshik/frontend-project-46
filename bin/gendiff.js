#!/usr/bin/env node

import { program } from 'commander';
import { fs } from 'node:fs';
import { cwd } from 'node:process';
import { path } from 'node:path';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .argument('<filePath1>', 'path for the first file')
  .argument('<filePath2>', 'path for the second file')
  .action;

program.parse();

