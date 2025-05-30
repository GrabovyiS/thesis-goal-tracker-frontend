import api from "../api";

export default {
  namespaced: true,

  state: {
    items: [],
  },

  mutations: {
    setLogs(state, logs) {
      state.items = logs;
    },
  },

  actions: {},

  getters: {
    allLogs(state) {
      return state.items;
    },
  },
};
