const states = {
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
      key, state, value, oldValue, newValue,
    } = node;

    if (node.state !== 'nested' && node.state !== 'updated') {
      return `${currentIndent}${states[state]}${key}: ${stringify(value, depth)}`;
    }
    if (node.state === 'updated') {
      return `${currentIndent}${states[state][0]}${key}: ${stringify(oldValue, depth)}\n${currentIndent}${states[state][1]}${key}: ${stringify(newValue, depth)}`;
    }
    if (node.state === 'nested') {
      return `${currentIndent}${states[state]}${key}: {\n${node.value.map((el) => iter(el, depth + 1)).join('\n')}\n${lastIndent}}`;
    }
    throw new Error(`Invalid node state - ${state}`);
  };

  return `{\n${tree.map((el) => iter(el, 1)).join('\n')}\n}`;
};

export default stylish;
