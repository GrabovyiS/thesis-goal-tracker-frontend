<template>
  <div class="dashboard">
    <GoalsColumn />
    <QuestsColumn />
    <TasksColumn />
    <ActiveTasksColumn />
  </div>
  <RewardCard :reward="mockReward" />
  <LogCard :log="mockLog" :quest="mockQuest" />

  <ContextMenu :items="['delete', 'download', 'update']" />
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import GoalsColumn from "../components/GoalsColumn.vue";
import QuestsColumn from "../components/QuestsColumn.vue";
import TasksColumn from "../components/TasksColumn.vue";
import ActiveTasksColumn from "../components/ActiveTasksColumn.vue";
import RewardCard from "../components/RewardCard.vue";
import LogCard from "../components/LogCard.vue";

const mockReward = {
  id: "adfszxvc",
  emoji: "🥶",
  title: "Some Reward Title",
  collected: "no",
};

const mockQuest = {
  id: "asdf",
  dueDate: "2025-05-23T17:42:15.123Z",
  title: "Название квеста",
  description:
    "Короткое описание квеста коиорое дает некоторое количество необязательного контекста",
  percentage: 90,
};

const mockLog = {
  id: "asdfasdf",
  questId: "asdf",
  title: "Название лога цели",
  description: "Содержимое лога цели",
  date: "2024-01-01",
  files: [
    {
      id: "...",
      name: "example.pdf",
      mimeType: "application/pdf",
      taskId: "asss",
      createdAt: "...",
      updatedAt: "...",
    },
  ],
};

const store = useStore();

const selectedGoalId = computed(() => store.getters["goals/selectedGoalId"]);
const selectedQuestId = computed(() => store.getters["quests/selectedQuestId"]);

onMounted(async () => {
  await store.dispatch("goals/fetchGoals");
  if (selectedGoalId.value) {
    await store.dispatch("quests/fetchQuests", selectedGoalId.value);
  }
  console.log(store.getters["quests/allQuests"]);
  console.log(store.getters["goals/allGoals"]);
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
