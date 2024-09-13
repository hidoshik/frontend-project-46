import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish: (tree) => stylish(tree),
  plain: (tree) => plain(tree),
  json: (tree, replacer = null, space = 4) => JSON.stringify(tree, replacer, space),
};

const defineFormatter = (tree, formatter) => {
  if (!Object.hasOwn(formatters, formatter)) {
    throw new Error(`Invalid formatter - ${formatter}`);
  }
  return formatters[formatter](tree);
};

export default defineFormatter;
