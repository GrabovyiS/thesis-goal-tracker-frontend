const formatDateToDDMM = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
};

function formatDateToLong(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("ru-RU", options);
}

export { formatDateToDDMM, formatDateToLong };
