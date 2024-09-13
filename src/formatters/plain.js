const getValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node;
    switch (node.type) {
      case 'added':
        return `Property '${key}' was added with value: ${getValue(value)}`;
      case 'updated':
        return `Property '${key}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
      case 'unchanged':
        return [];
      case 'removed':
        return `Property '${key}' was removed`;
      case 'nested':
        return children.flatMap((item) => {
          const newKey = `${key}.${item.key}`;
          const newEl = { ...item, key: newKey };
          return iter(newEl);
        });
      default:
        throw new Error(`Invalid node state - ${type}`);
    }
  };
  return tree.flatMap(iter).join('\n');
};

export default plain;
