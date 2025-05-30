import api from "../api";

export default {
  namespaced: true,

  state: {
    items: [],
  },

  mutations: {
    setRewards(state, rewards) {
      state.items = rewards;
    },
  },

  actions: {},

  getters: {
    allRewards(state) {
      return state.items;
    },
  },
};
