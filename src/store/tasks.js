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
    async fetchTasks({ commit }, questId) {
      const res = await api.get("/api/tasks?questId=" + questId);
      commit("setTasks", res.data);
    },
    async createTask({ commit }, taskData) {
      const res = await api.post("/api/tasks", taskData);
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
