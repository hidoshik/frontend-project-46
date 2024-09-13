const types = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  nested: '  ',
  updated: ['- ', '+ '],
};

const stringify = (value, currentDepth, spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }

    const blank = ' ';
    const indentSize = depth * spacesCount;
    const currentIndent = blank.repeat(indentSize);
    const lastIndent = blank.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`,
    );

    return `{\n${lines.join('\n')}\n${lastIndent}}`;
  };

  return iter(value, 1 + currentDepth);
};

const stylish = (tree, spacesCount = 4) => {
  const iter = (node, depth) => {
    const blank = ' ';
    const leftIndent = 2;
    const indentSize = depth * spacesCount;
    const currentIndent = blank.repeat(indentSize - leftIndent);
    const lastIndent = blank.repeat(indentSize);

    const {
      key, type, value, oldValue, newValue,
    } = node;

    if (node.type !== 'nested' && node.type !== 'updated') {
      return `${currentIndent}${types[type]}${key}: ${stringify(value, depth)}`;
    }
    if (node.type === 'updated') {
      return `${currentIndent}${types[type][0]}${key}: ${stringify(oldValue, depth)}\n${currentIndent}${types[type][1]}${key}: ${stringify(newValue, depth)}`;
    }
    if (node.type === 'nested') {
      return `${currentIndent}${types[type]}${key}: {\n${node.children.map((el) => iter(el, depth + 1)).join('\n')}\n${lastIndent}}`;
    }
    throw new Error(`Invalid node type - ${type}`);
  };

  return `{\n${tree.map((el) => iter(el, 1)).join('\n')}\n}`;
};

export default stylish;
