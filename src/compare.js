import _ from 'lodash';

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

const getKeys = (newData1, newData2) => {
  const keys1 = Object.keys(newData1);
  const keys2 = Object.keys(newData2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  return sortedKeys;
};

const compare = (data1, data2, spacesCount = 4) => {
  const iter = (newData1, newData2, depth) => {
    const keys = getKeys(newData1, newData2);

    const blank = ' ';
    const leftIndent = 2;
    const indentSize = depth * spacesCount;
    const currentIndent = blank.repeat(indentSize - leftIndent);
    const lastIndent = blank.repeat(indentSize - spacesCount);

    const diffTree = keys.map((key) => {
      if (!Object.hasOwn(newData1, key)) {
        return `${currentIndent}+ ${key}: ${stringify(newData2[key], depth)}`;
      }
      if (!Object.hasOwn(newData2, key)) {
        return `${currentIndent}- ${key}: ${stringify(newData1[key], depth)}`;
      }
      if (_.isPlainObject(newData1[key]) && _.isPlainObject(newData2[key])) {
        return `${currentIndent}  ${key}: ${iter(newData1[key], newData2[key], depth + 1)}`;
      }
      if (newData1[key] !== newData2[key]) {
        return [`${currentIndent}- ${key}: ${stringify(newData1[key], depth)}`, `${currentIndent}+ ${key}: ${stringify(newData2[key], depth)}`].join('\n');
      }
      return `${currentIndent}  ${key}: ${stringify(newData1[key], depth)}`;
    });
    return `{\n${diffTree.join('\n')}\n${lastIndent}}`;
  };

  return iter(data1, data2, 1);
};

export default compare;
