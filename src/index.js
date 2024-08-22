import path from 'node:path';
import fs from 'node:fs';
import { parse } from './parse.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const getFileData = (filepath) => {
    const fullFilePath = getFullPath(filepath);
    const format = getFileFormat(filepath);
    const data = parse(fs.readFileSync(fullFilePath, 'utf8'), format);
    return data;
}

export default getFileData;