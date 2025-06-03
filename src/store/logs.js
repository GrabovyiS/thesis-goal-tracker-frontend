import api from "../api";
import { generateTempId } from "../utils/tempId";

export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    setLogs(state, logs) {
      state.items = logs;
    },

    addLog(state, log) {
      state.items.unshift(log);
    },

    replaceLogId(state, { oldId, newId }) {
      const index = state.items.findIndex((l) => l.id === oldId);
      if (index !== -1) {
        state.items[index].id = newId;
      }
    },

    removeLog(state, id) {
      state.items = state.items.filter((l) => l.id !== id);
    },

    updateLog(state, updated) {
      const index = state.items.findIndex((l) => l.id === updated.id);
      if (index !== -1) state.items[index] = updated;
    },
  },

  actions: {
    async fetchLogs({ commit }) {
      const res = await api.get("/api/logs");
      commit("setLogs", res.data);
    },

    async createLog({ commit }, questId) {
      const id = generateTempId();
      const title = "Новая заметка";
      const description = "Текст заметки";

      commit("addLog", {
        id,
        questId,
        title,
        description,
        createdAt: new Date().toISOString(),
      });

      try {
        const res = await api.post("/api/logs", {
          questId,
          title,
          description,
        });
        commit("replaceLogId", { oldId: id, newId: res.data.id });
      } catch (err) {
        console.error(err);
      }
    },

    async deleteLog({ commit }, id) {
      commit("removeLog", id);

      try {
        await api.delete(`/api/logs/${id}`);
      } catch (err) {
        console.error(err);
      }
    },

    async updateLog({ commit }, log) {
      commit("updateLog", log);

      try {
        await api.put(`/api/logs/${log.id}`, {
          title: log.title,
          description: log.description,
          questId: log.questId,
        });
      } catch (err) {
        console.error(err);
      }
    },
  },

  getters: {
    allLogs(state) {
      return state.items;
    },

    logsByQuest: (state) => (questId) => {
      return state.items.filter((l) => l.questId === questId);
    },
  },
};
