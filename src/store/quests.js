import api from "../api";

export default {
  namespaced: true,
  state: {
    items: [],
    selectedId: null,
  },
  mutations: {
    setQuests(state, quests) {
      state.items = quests;
      if (quests.length > 0 && !state.selectedId) {
        state.selectedId = quests[0].id;
      }
    },
    setSelectedQuestId(state, id) {
      state.selectedId = id;
    },
    addQuest(state, quest) {
      state.items.unshift(quest);
      state.selectedId = quest.id;
    },
    removeQuest(state, id) {
      state.items = state.items.filter((q) => q.id !== id);
      if (state.selectedId === id) {
        state.selectedId = state.items[0]?.id || null;
      }
    },
    updateQuest(state, updated) {
      const index = state.items.findIndex((q) => q.id === updated.id);
      if (index !== -1) state.items[index] = updated;
    },
  },

  actions: {
    async fetchQuests({ commit }) {
      const res = await api.get("/api/quests");
      commit("setQuests", res.data);
    },
    async createQuest({ commit }, { goalId }) {
      const title = "Название квеста";
      const description = "Дополнительное описание квеста";
      deadline = null;
      const res = await api.post("/api/quests", {
        goalId,
        title,
        description,
        deadline,
      });
      commit("addQuest", res.data);
    },

    async deleteQuest({ commit }, id) {
      await api.delete(`/api/quests/${id}`);
      commit("removeQuest", id);
    },

    async updateQuest({ commit }, { id, title, description, deadline }) {
      const res = await api.put(`/api/quests/${id}`, {
        title,
        description,
        deadline,
      });
      if (res.data.updated) {
        commit("updateQuest", { id, title, description, deadline });
      }
    },
  },

  getters: {
    allQuests(state) {
      return state.items;
    },

    questsByGoal: (state) => (goalId) => {
      return state.items.filter((q) => q.goalId === goalId);
    },

    selectedQuestId(state) {
      return state.selectedId;
    },

    selectedQuest(state) {
      return state.items.find((q) => q.id === state.selectedId) || null;
    },
  },
};
