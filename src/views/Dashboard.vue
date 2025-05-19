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

const selectedGoalId = computed(() => store.getters["goals/selectedGoalId"]);
const selectedQuestId = computed(() => store.getters["quests/selectedQuestId"]);

onMounted(async () => {
  await store.dispatch("goals/fetchGoals");
  if (selectedGoalId.value) {
    await store.dispatch("quests/fetchQuests", selectedGoalId.value);
  }
  if (selectedQuestId.value) {
    await store.dispatch("tasks/fetchTasks", selectedQuestId.value);
  }
  store.dispatch("activeTasks/fetchActiveTasks");
});

watch(selectedGoalId, (newId) => {
  if (newId) {
    store.dispatch("quests/fetchQuests", newId);
  }
});

watch(selectedQuestId, (newId) => {
  if (newId) {
    store.dispatch("tasks/fetchTasks", newId);
  }
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
