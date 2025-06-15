import api from "../api";

export default {
  namespaced: true,
  state: {
    allGoals: [],
    allQuests: [],
    allTasks: [],
  },

  mutations: {
    setGoals(state, goals) {
      state.allGoals = goals;
    },

    setQuests(state, quests) {
      state.allQuests = quests;
    },

    setTasks(state, tasks) {
      state.allTasks = tasks;
    },
  },

  actions: {
    async fetchGoals({ commit }) {
      const res = await api.get("/api/goals/all");
      console.log(res.data);
      commit("setGoals", res.data);
    },

    async fetchQuests({ commit }) {
      const res = await api.get("/api/quests/all");
      commit("setQuests", res.data);
    },

    async fetchTasks({ commit }) {
      const res = await api.get("/api/tasks/all");
      commit("setTasks", res.data);
    },
  },

  getters: {
    allGoals(state) {
      return state.allGoals;
    },

    allQuests(state) {
      return state.allQuests;
    },

    allTasks(state) {
      return state.allTasks;
    },
  },
};
