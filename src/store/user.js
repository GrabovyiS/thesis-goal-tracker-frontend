import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

export default {
  namespaced: true,
  state: {
    user: null,
    allUsers: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setUsers(state, users) {
      state.allUsers = users;
    },

    subscribeUser(state) {
      state.user.role = "SUBSCRIBER";
    },

    unsubscribeUser(state) {
      state.user.role = "USER";
    },
  },
  actions: {
    async fetchAllUsers({ commit }) {
      const res = await axios.get("/api/users", { withCredentials: true });
      console.log(res.data);
      commit("setUsers", res.data);
    },

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

    async subscribe({ commit, dispatch }) {
      try {
        const res = await axios.put("/me/subscribe", { withCredentials: true });
        commit("subscribeUser");
        dispatch(
          "notifications/notifySuccess",
          {
            title: "Пользователь успешно подписан",
          },
          { root: true }
        );
      } catch (err) {
        commit("unsubscribeUser");
        dispatch(
          "notifications/notifyError",
          {
            title: "Произошла ошибка при подписке пользователя",
          },
          { root: true }
        );
        console.error(err);
      }
    },
  },
  getters: {
    user: (state) => {
      return state.user;
    },

    allUsers: (state) => {
      return state.allUsers;
    },
  },
};
