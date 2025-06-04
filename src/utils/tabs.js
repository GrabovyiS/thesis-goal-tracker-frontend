const tabs = [
  { label: "Все", key: "all" },
  { label: "Активные", key: "ongoing" },
  { label: "Завершенные", key: "completed" },
];

const filterByTabs = (items, selectedTab) => {
  if (selectedTab === "all") {
    return items;
  }

  if (selectedTab === "completed") {
    return items.filter((i) => i.completed);
  }

  if (selectedTab === "ongoing") {
    return items.filter((i) => !i.completed);
  }
};

export { tabs, filterByTabs };
