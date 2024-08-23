const parsers = {
  json: JSON.parse,
};

const parse = (data, format) => parsers[format](data);

export default parse;
