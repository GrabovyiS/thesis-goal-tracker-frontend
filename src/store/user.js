import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

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

    async logOut({ commit }) {
      try {
        const res = await axios.get("/logout", { withCredentials: true });
        commit("setUser", null);
        router.push("/");
      } catch (err) {
        console.error("Logout failed", err);
      }
    },
  },
  getters: {
    user: (state) => {
      return state.user;
    },
  },
};
