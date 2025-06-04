// store/modules/notification.js
const state = () => ({
  queue: [],
});

const mutations = {
  addNotification(state, notification) {
    state.queue.push(notification);
  },
  rmeoveNotification(state, id) {
    state.queue = state.queue.filter((n) => n.id !== id);
  },
};

const actions = {
  notify({ commit }, payload) {
    const id = Date.now();
    const notification = { ...payload, id };
    commit("ADD_NOTIFICATION", notification);

    // Remove after timeout (5s default)
    setTimeout(() => commit("removeNotification", id), payload.timeout || 5000);
  },

  playSelectChangeSound({}) {
    const audio = new Audio("/sounds/change.mp3");
    audio.play();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
