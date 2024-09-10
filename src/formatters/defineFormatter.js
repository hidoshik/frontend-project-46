import stylish from './stylish.js';
import plain from './plain.js';

const defineFormatter = (tree, formatter) => {
  if (formatter === 'stylish') {
    return stylish(tree);
  }
  if (formatter === 'plain') {
    return plain(tree);
  }
  if (formatter === 'json') {
    return JSON.stringify(tree, null, 4);
  }
  throw new Error(`Invalid formatter - ${formatter}`);
};

export default defineFormatter;
