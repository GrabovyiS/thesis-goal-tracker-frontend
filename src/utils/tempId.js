const generateTempId = () => {
  return `temp-${Math.random().toString(36)}`;
};

export { generateTempId };
