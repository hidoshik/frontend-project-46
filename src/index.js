import path from 'node:path';
import fs from 'node:fs';
import parse from './parse.js';
import compare from './compare.js';
import defineFormatter from './formatters/defineFormatter.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);

  const format = getFileFormat(filePath1);
  const file1 = readFile(fullPath1);
  const file2 = readFile(fullPath2);

  const data1 = parse(file1, format);
  const data2 = parse(file2, format);

  const diff = compare(data1, data2);
  return defineFormatter(diff, formatName);
};

export default genDiff;
