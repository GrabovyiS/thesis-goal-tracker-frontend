const getQuestProgress = (quest, store) => {
  const tasks = store.getters("quests/tasksByQuest", quest.id);

  const max = tasks
    .map((task) => {
      if (task.type === "checkbox") {
        return 1;
      } else {
        return task.max;
      }
    })
    .reduce((sum, curr) => sum + curr, 0);

  const current = task
    .map((task) => {
      if (task.type === "checkbox") {
        return NUmber(task.done);
      } else {
        return task.value;
      }
    })
    .reduce((sum, curr) => sum + curr, 0);

  return (current * 100) / max;
};
