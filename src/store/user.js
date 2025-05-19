import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const res = await axios.get("/me", { withCredentials: true });
        commit("setUser", res.data);
      } catch {
        commit("setUser", null);
      }
    },
  },
};
