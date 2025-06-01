import api from "../api";
import { generateTempId } from "../utils/tempId";

export default {
  namespaced: true,

  state: {
    items: [],
  },

  mutations: {
    setRewards(state, rewards) {
      state.items = rewards;
    },

    createReward(state, reward) {
      state.items.push(reward);
    },

    replaceRewardId(state, { oldId, newId }) {
      const index = state.items.findIndex((r) => r.id === oldId);

      if (index !== -1) {
        state.items[index].id = newId;
      }
    },

    removeReward(state, id) {
      state.items = state.items.filter((r) => r.id !== id);
    },

    updateReward(state, updated) {
      const index = state.items.findIndex((r) => r.id === updated.id);
      if (index !== -1) state.items[index] = updated;
    },
  },

  actions: {
    async fetchRewards({ commit }) {
      const res = await api.get("/api/rewards");
      commit("setRewards", res.data);
    },

    async createReward({ commit }, questId) {
      const title = "Награда — ожидаемый результат";
      const emoji = "🚀";
      const collected = false;
      const tempId = generateTempId();

      commit("createReward", { title, emoji, collected, tempId, questId });

      try {
        const res = await api.post("/api/rewards", {
          title,
          emoji,
          collected,
          questId,
        });
        commit("replaceRewardId", { oldId: tempId, newId: res.data.id });
      } catch (err) {
        console.error(err);
      }
    },

    async updateReward({ commit }, newReward) {
      commit("updateReward", newReward);
      const { title, emoji, collected, questId } = newReward;

      try {
        const res = await api.put(`/api/rewards/${newReward.id}`, {
          title,
          emoji,
          collected,
          questId,
        });
      } catch (err) {}
    },

    async deleteReward({ commit }, id) {
      commit("removeReward", id);
      await api.delete("api/rewards/" + id);
    },
  },

  getters: {
    allRewards(state) {
      return state.items;
    },

    rewardsByQuest: (state) => (questId) => {
      return state.items.filter((r) => r.questId === questId);
    },
  },
};
