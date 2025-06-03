<template>
  <div class="dashboard">
    <GoalsColumn />
    <QuestsColumn />
    <TasksColumn />
    <ActiveTasksColumn />
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import GoalsColumn from "../components/GoalsColumn.vue";
import QuestsColumn from "../components/QuestsColumn.vue";
import TasksColumn from "../components/TasksColumn.vue";
import ActiveTasksColumn from "../components/ActiveTasksColumn.vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch("goals/fetchGoals");
  await store.dispatch("quests/fetchQuests");
  await store.dispatch("tasks/fetchTasks");
  await store.dispatch("rewards/fetchRewards");
  await store.dispatch("activeTasks/fetchActiveTasks");
  await store.dispatch("logs/fetchLogs");
});
</script>

<style scoped>
.dashboard {
  padding: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
}
</style>
