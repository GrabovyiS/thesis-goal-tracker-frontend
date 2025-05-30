import api from "../api";

export default {
  namespaced: true,
  state: {
    items: [],
  },

  mutations: {
    setActiveTasks(state, list) {
      state.items = list;
    },
    addActiveTask(state, task) {
      if (!state.items.find((t) => t.id === task.id)) {
        state.items.push(task);
      }
    },
    removeActiveTask(state, taskId) {
      state.items = state.items.filter((t) => t.id !== taskId);
    },
    reorderActiveTasks(state, orderedTasks) {
      state.items = orderedTasks;
    },
  },

  actions: {
    async fetchActiveTasks({ commit }) {
      const res = await api.get("/api/active-tasks");
      commit(
        "setActiveTasks",
        res.data.map((a) => a.task)
      );
    },

    async addActiveTask({ state, commit }, taskId) {
      if (state.items.find((t) => t.id === taskId)) return;
      const res = await api.post("/api/active-tasks", { taskId });
      commit("addActiveTask", res.data.task);
    },

    async removeActiveTask({ commit }, taskId) {
      await api.delete(`/api/active-tasks/${taskId}`);
      commit("removeActiveTask", taskId);
    },

    async reorderActiveTasks({ commit, state }, taskIds) {
      await api.put("/api/active-tasks/reorder", {
        orderedTaskIds: taskIds,
      });
      const reordered = taskIds
        .map((id) => state.items.find((t) => t.id === id))
        .filter(Boolean);
      commit("reorderActiveTasks", reordered);
    },
  },

  getters: {
    allActiveTasks(state) {
      return state.items;
    },
  },
};
