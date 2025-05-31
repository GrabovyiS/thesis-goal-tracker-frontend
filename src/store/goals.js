import api from "../api";
import { generateTempId } from "../utils/tempId";

export default {
  namespaced: true,
  state: {
    items: [],
    selectedId: null,
  },

  mutations: {
    setGoals(state, goals) {
      state.items = goals;
      if (goals.length > 0 && !state.selectedId) {
        state.selectedId = goals[0].id;
      }
    },

    setSelectedGoalId(state, id) {
      state.selectedId = id;
    },

    addGoal(state, goal) {
      state.items.unshift(goal);
      state.selectedId = goal.id;
    },

    replaceGoalId(state, { oldId, newId }) {
      const index = state.items.findIndex((g) => g.id === oldId);

      if (index) {
        state.items[index].id = newId;
      }
    },

    updateGoal(state, updated) {
      console.log(updated);
      const index = state.items.findIndex((g) => g.id === updated.id);
      if (index !== -1) state.items[index] = updated;
    },

    removeGoal(state, id) {
      state.items = state.items.filter((g) => g.id !== id);
      if (state.selectedId === id) {
        state.selectedId = state.items[0]?.id || null;
      }
    },
  },

  actions: {
    async fetchGoals({ commit }) {
      const res = await api.get("/api/goals");
      commit("setGoals", res.data);
    },

    async createGoal({ commit }) {
      const title = "Название цели";
      const description =
        "Некоторое описание цели, которое даёт немного дополнительного контекста";
      const id = generateTempId();

      commit("addGoal", { title, description, id });

      try {
        const res = await api.post("/api/goals", {
          title,
          description,
          id,
        });
        commit("replaceGoalId", { oldId: id, newId: res.data.id });
      } catch (err) {}
    },

    async updateGoal({ commit }, goal) {
      commit("updateGoal", goal);

      try {
        const res = await api.put(`/api/goals/${id}`, { title, description });
        commit("updateGoal", res);
      } catch (err) {}
    },

    async deleteGoal({ commit }, id) {
      commit("removeGoal", id);
      try {
        await api.delete(`/api/goals/${id}`);
      } catch (err) {
        console.error("Ошибка при удалении цели:", err);
      }
    },
  },

  getters: {
    allGoals(state) {
      return state.items;
    },

    selectedGoal(state) {
      return state.items.find((g) => g.id === state.selectedId) || null;
    },

    selectedGoalId(state) {
      return state.selectedId;
    },
  },
};
