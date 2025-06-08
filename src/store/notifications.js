const sounds = {
  success: "/sounds/success.mp3",
  error: "/sounds/error.mp3",
  change: "/sounds/change.mp3",
  valueMinus: "/sounds/value-minus.mp3",
  valuePlus: "/sounds/value-plus.mp3",
};

function playSound(src) {
  const audio = new Audio(src);
  audio.play().catch((e) => {
    // Optional: suppress or log errors, e.g. when browser blocks autoplay
    console.warn("Sound play failed:", e);
  });
}

export default {
  namespaced: true,

  state: {
    queue: [],
  },

  mutations: {
    addNotification(state, notification) {
      state.queue.push(notification);
    },

    removeNotification(state, id) {
      state.queue = state.queue.filter((n) => n.id !== id);
    },
  },

  actions: {
    notifySuccess({ commit }, payload) {
      const id = Date.now();
      const notification = { ...payload, id, type: "success" };
      commit("addNotification", notification);

      playSound(sounds.success);

      setTimeout(
        () => commit("removeNotification", id),
        payload.timeout || 4000
      );
    },

    notifyError({ commit }, payload) {
      const id = Date.now();
      const notification = { ...payload, id, type: "error" };
      commit("addNotification", notification);

      playSound(sounds.error);

      setTimeout(
        () => commit("removeNotification", id),
        payload.timeout || 4000
      );
    },

    notifyValuePlus() {
      playSound(sounds.valuePlus);
    },

    notifyValueMinus() {
      playSound(sounds.valueMinus);
    },

    notifySelect() {
      playSound(sounds.change);
    },
  },

  getters: {
    allNotifications: (state) => state.queue,
  },
};
