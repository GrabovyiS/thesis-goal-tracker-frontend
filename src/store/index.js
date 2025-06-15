import { createStore } from "vuex";
import user from "./user";
import goals from "./goals";
import quests from "./quests";
import tasks from "./tasks";
import rewards from "./rewards";
import logs from "./logs";
import notifications from "./notifications";
import admin from "./admin";

export default createStore({
  modules: {
    user,
    goals,
    quests,
    tasks,
    rewards,
    logs,
    notifications,
    admin,
  },
});
