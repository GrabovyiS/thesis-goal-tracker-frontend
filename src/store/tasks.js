import api from "../api";
import { generateTempId } from "../utils/tempId";
import { toRawDeep } from "../utils/toRawDeep";

export default {
  namespaced: true,
  state: () => ({
    items: [],
    activeTaskIds: [],
  }),

  mutations: {
    setTasks(state, tasks) {
      state.items = tasks;
    },

    addTask(state, task) {
      state.items.unshift(task);
    },

    updateTask(state, task) {
      const index = state.items.findIndex((t) => t.id === task.id);
      state.items[index] = task;
    },

    replaceTaskId(state, { oldId, newId }) {
      const index = state.items.findIndex((t) => t.id === oldId);
      state.items[index].id = newId;
    },

    completeTask(state, id) {
      const index = state.items.findIndex((t) => t.id === id);
      if (index !== -1) state.items[index].completed = true;
    },

    removeTask(state, id) {
      state.items = state.items.filter((t) => t.id !== id);
    },

    setActiveTasks(state, list) {
      state.activeTaskIds = list.map((item) => item.taskId);
    },

    setActiveTaskIds(state, list) {
      state.activeTaskIds = list;
    },

    addActiveTask(state, { taskId, position }) {
      if (!state.activeTaskIds.find((t) => t.id === taskId)) {
        state.activeTaskIds.splice(position, 0, taskId);
      }
    },

    removeActiveTask(state, taskId) {
      state.activeTaskIds = state.activeTaskIds.filter((id) => id !== taskId);
    },
  },

  actions: {
    async fetchTasks({ commit }) {
      const res = await api.get("/api/tasks");
      commit("setTasks", res.data);
    },

    async fetchActiveTasks({ commit }) {
      const res = await api.get("/api/active-tasks");

      commit("setActiveTasks", res.data);
    },

    async createTask({ commit }, questId) {
      const title = "Название задачи";
      const description = "Описание задачи";
      const type = "checkbox";
      const done = false;
      const id = generateTempId();

      commit("addTask", { title, description, type, done, id, questId });

      try {
        const res = await api.post("/api/tasks", {
          title,
          description,
          type,
          done,
          questId,
        });
        commit("replaceTaskId", { oldId: id, newId: res.data.id });
      } catch (err) {
        console.error(err);
      }
    },

    async updateTask({ commit }, task) {
      commit("updateTask", task);

      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          title: task.title,
          description: task.description,
          done: task.done,
          max: task.max,
          questId: task.questId,
          type: task.type,
          value: task.value,
        })
      );

      for (const file of task.files) {
        formData.append("files", file);
      }

      try {
        const res = await api.put("/api/tasks/" + task.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        commit("updateTask", res.data);
      } catch (err) {
        console.error(err);
      }
    },

    async completeTask({ commit }, task) {
      commit("completeTask", task.id);

      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          title: task.title,
          description: task.description,
          done: task.done,
          max: task.max,
          questId: task.questId,
          type: task.type,
          value: task.value,
          completed: true,
        })
      );

      for (const file of task.files) {
        formData.append("files", file);
      }

      try {
        const res = await api.put("/api/tasks/" + task.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        commit("updateTask", res.data);
      } catch (err) {
        console.error(err);
      }
    },

    async deleteTask({ commit }, id) {
      commit("removeTask", id);
      try {
        await api.delete("/api/tasks/" + id);
      } catch (err) {
        console.error(err);
      }
    },

    async getFile({}, id) {
      try {
        const res = await api.get("/api/tasks/files/" + id, {
          responseType: "blob",
        });

        const contentDisposition = res.headers["content-disposition"];

        const match =
          contentDisposition &&
          contentDisposition.match(/filename\*?=(?:UTF-8''|")?([^"]+)/);

        const filename = match
          ? decodeURIComponent(match[1])
          : "downloaded_file";

        const blob = new Blob([res.data]);
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Ошибка при скачивании файла:", err);
      }
    },

    async addActiveTask({ commit, state }, { taskId, position }) {
      commit("addActiveTask", { taskId, position });

      try {
        await api.put("/api/active-tasks", {
          taskIds: toRawDeep(state.activeTaskIds),
        });
      } catch (err) {}
    },

    async reorderActiveTasks({ commit }, orderedTasks) {
      commit("setActiveTaskIds", orderedTasks);

      try {
        await api.put("/api/active-tasks", {
          taskIds: orderedTasks,
        });
      } catch (err) {}
    },

    async removeActiveTask({ commit }, taskId) {
      commit("removeActiveTask", taskId);

      try {
        await api.delete(`/api/active-tasks/${taskId}`);
      } catch (err) {}
    },
  },

  getters: {
    allTasks: (state) => state.items,

    tasksByQuest: (state) => (questId) => {
      return state.items.filter((t) => t.questId === questId);
    },

    activeTaskIds: (state) => state.activeTaskIds,

    allActiveTasks: (state) =>
      state.activeTaskIds
        .map((id) => state.items.find((task) => task.id === id))
        .filter(Boolean),
  },
};
