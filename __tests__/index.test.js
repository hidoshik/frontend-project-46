import path from 'path';
import { fileURLToPath } from 'url';
import { genDiff, getFileData } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const data1 = getFileData(getFixturePath('file1.json'));
const data2 = getFileData(getFixturePath('file2.json'));

test('genDiff', () => {
  const expected = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

  expect(genDiff(data1, data2)).toEqual(expected);
});
