const parsers = {
    json: JSON.parse,
}

export const parse = (data, format) => parsers[format](data);