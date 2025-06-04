const sortByCreatedAt = (items, desc) => {
  if (desc) {
    return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    return items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
};

export { sortByCreatedAt };
