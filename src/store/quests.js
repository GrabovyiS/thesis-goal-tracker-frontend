import api from "../api";
import { generateTempId } from "../utils/tempId";

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

    replaceQuestId(state, { oldId, newId }) {
      const index = state.items.findIndex((q) => q.id === oldId);

      if (index !== -1) {
        state.items[index].id = newId;
      }

      if (state.selectedId === oldId) {
        state.selectedId = newId;
      }
    },

    removeQuest(state, id) {
      state.items = state.items.filter((q) => q.id !== id);
      if (state.selectedId === id) {
        state.selectedId = state.items[0]?.id || null;
      }
    },

    completeQuest(state, id) {
      const index = state.items.findIndex((g) => g.id === id);
      if (index !== -1) state.items[index].completed = true;
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
    async createQuest({ commit }, goalId) {
      const title = "Название квеста";
      const description = "Дополнительное описание квеста";
      const id = generateTempId();
      const deadline = null;

      commit("addQuest", { id, title, goalId, description, deadline });

      try {
        const res = await api.post("/api/quests", {
          goalId,
          title,
          description,
          deadline,
        });

        commit("replaceQuestId", { oldId: id, newId: res.data.id });
      } catch (err) {}
    },

    async deleteQuest({ commit }, id) {
      commit("removeQuest", id);

      try {
        await api.delete(`/api/quests/${id}`);
      } catch (err) {
        console.error(err);
      }
    },

    async completeQuest({ commit }, quest) {
      const { id, title, description, deadline, goalId, completed } = quest;

      commit("completeQuest", id);

      try {
        const res = await api.put(`/api/quests/${id}`, {
          title,
          description,
          deadline,
          goalId,
          completed: true,
        });
      } catch (err) {
        console.error(err);
      }
    },

    async updateQuest({ commit }, newQuest) {
      const { id, title, description, deadline, goalId } = newQuest;
      console.log(deadline);
      commit("updateQuest", newQuest);

      try {
        const res = await api.put(`/api/quests/${id}`, {
          title,
          description,
          deadline,
          goalId,
        });
      } catch (err) {}
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
