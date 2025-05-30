import api from "../api";

export default {
  namespaced: true,
  state: () => ({
    tasks: [],
  }),
  getters: {
    allTasks: (state) => state.tasks,
    tasksByQuest: (state) => (questId) => {
      return state.tasks.filter((t) => t.questId === questId);
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const res = await api.get("/api/tasks");
      commit("setTasks", res.data);
    },

    async createTask({ commit }) {
      const title = "Название задачи";
      const description = "Описание задачи";
      const type = "checkbox";

      const res = await api.post("/api/tasks", { title, description, type });
      commit("addTask", res.data);
    },

    async updateTask({ state }, taskData) {
      const res = await api.put("/api/tasks/" + taskData.id, taskData);
      const index = state.tasks.findIndex((t) => t.id === taskData.id);
      if (index !== -1) state.tasks[index] = res.data;
    },

    async deleteTask({ commit }, id) {
      await api.delete("/api/tasks/" + id);
      commit("removeTask", id);
    },

    async getFile({}, id) {
      try {
        const res = await api.get("/api/files/" + id, {
          responseType: "blob",
        });

        const contentDisposition = res.headers["content-disposition"];
        const match =
          contentDisposition && contentDisposition.match(/filename="?(.+)"?/);
        const filename = match ? match[1] : "downloaded_file";

        const blob = new Blob([res.data]);
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Ошибка при скачивании файла:", err);
      }
    },
  },

  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },

    addTask(state, task) {
      state.tasks.push(task);
    },

    removeTask(state, id) {
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },
  },
};
