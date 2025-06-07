const successSound = new Audio("/sounds/success.mp3");
const errorSound = new Audio("/sounds/error.mp3");
const changeSound = new Audio("/sounds/change.mp3");
const valueMinusSound = new Audio("/sounds/value-minus.mp3");
const valuePlusSound = new Audio("/sounds/value-plus.mp3");

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

      successSound.play();

      setTimeout(
        () => commit("removeNotification", id),
        payload.timeout || 4000
      );
    },

    notifyError({ commit }, payload) {
      const id = Date.now();
      const notification = { ...payload, id, type: "error" };
      commit("addNotification", notification);

      errorSound.play();

      setTimeout(
        () => commit("removeNotification", id),
        payload.timeout || 4000
      );
    },

    notifyValuePlus({}) {
      valuePlusSound.play();
    },

    notifyValueMinus({}) {
      valueMinusSound.play();
    },

    notifySelect({}) {
      changeSound.play();
    },
  },

  getters: {
    allNotifications: (state) => {
      return state.queue;
    },
  },
};
