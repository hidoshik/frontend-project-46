import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';
import { parse } from './parse.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const getFileData = (filepath) => {
  const fullFilePath = getFullPath(filepath);
  const format = getFileFormat(filepath);
  const data = parse(fs.readFileSync(fullFilePath, 'utf8'), format);
  return data;
};

const getKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  return sortedKeys;
};

const genDiff = (data1, data2) => {
  const keys = getKeys(data1, data2);

  const diff = keys.map((key) => {
    const dataDiff1 = `${key}: ${data1[key]}`;
    const dataDiff2 = `${key}: ${data2[key]}`;

    if (!data1[key]) {
      return `+ ${dataDiff2}`;
    }
    if (!data2[key]) {
      return `- ${dataDiff1}`;
    }
    if (data1[key] === data2[key]) {
      return `  ${dataDiff1}`;
    }
    return [
      `- ${dataDiff1}`,
      `+ ${dataDiff2}`,
    ].join('\n');
  });

  return diff.join('\n');
};

export { getFileData, genDiff };
