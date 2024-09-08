import path from 'node:path';
import parse from './parse.js';
import compare from './compare.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filePath1, filePath2) => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);

  const data1 = parse(fullPath1);
  const data2 = parse(fullPath2);

  const diff = compare(data1, data2);
  return diff;
};

export default genDiff;
