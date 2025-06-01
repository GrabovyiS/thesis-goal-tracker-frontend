const getProgressFromTasks = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;

  const max = tasks
    .map((task) => {
      if (task.type === "checkbox") {
        return 1;
      } else {
        return task.max;
      }
    })
    .reduce((sum, curr) => sum + curr, 0);

  const current = tasks
    .map((task) => {
      if (task.type === "checkbox") {
        return Number(task.done);
      } else {
        return task.value;
      }
    })
    .reduce((sum, curr) => sum + curr, 0);

  return Math.floor((current * 100) / max);
};

export { getProgressFromTasks };
