import _ from 'lodash';

const getKeys = (newData1, newData2) => {
  const keys1 = Object.keys(newData1);
  const keys2 = Object.keys(newData2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  return sortedKeys;
};

const compare = (data1, data2) => {
  const keys = getKeys(data1, data2);

  const diffTree = keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, state: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, state: 'removed', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, state: 'nested', value: compare(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        key,
        state: 'updated',
        oldValue: data1[key],
        newValue: data2[key],
      };
    }
    return { key, state: 'unchanged', value: data1[key] };
  });

  return diffTree;
};

export default compare;
