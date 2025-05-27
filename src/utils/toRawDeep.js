const toRawDeep = (value) => {
  if (Array.isArray(value)) {
    return value.map(toRawDeep);
  }

  if (value !== null && typeof value === "object") {
    const result = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = toRawDeep(value[key]);
      }
    }
    return result;
  }

  return value;
};

export { toRawDeep };
