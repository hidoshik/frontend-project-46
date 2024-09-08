import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const parse = (filepath) => {
  const format = getFileFormat(filepath);
  const file = fs.readFileSync(filepath, 'utf8');
  return parsers[format](file);
};

export default parse;
