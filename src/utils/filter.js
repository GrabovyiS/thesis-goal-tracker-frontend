const filterObjects = (array, property, searchString) => {
  const normalize = (str) =>
    str
      ?.toString()
      .toLowerCase()
      .replace(/[\s\-_]/g, "") || "";

  const normalizedSearch = normalize(searchString);

  return array.filter((obj) =>
    normalize(obj[property]).includes(normalizedSearch)
  );
};

export { filterObjects };
