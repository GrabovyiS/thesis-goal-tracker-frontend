import { createStore } from "vuex";
import user from "./user";
import goals from "./goals";
import quests from "./quests";
import tasks from "./tasks";
import rewards from "./rewards";
import activeTasks from "./activeTasks";
import logs from "./logs";

export default createStore({
  modules: { user, goals, quests, tasks, rewards, logs, activeTasks },
});
