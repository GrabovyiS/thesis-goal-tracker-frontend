import { createStore } from "vuex";
import user from "./user";
import goals from "./goals";
import quests from "./quests";
import tasks from "./tasks";
import activeTasks from "./activeTasks";

export default createStore({
  modules: { user, goals, quests, tasks, activeTasks },
});
