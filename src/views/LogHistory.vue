<template>
  <div class="container">
    <div class="content">
      <div class="search">
        <h3>Поиск</h3>
        <input type="text" v-model="searchFilter" class="search" />
      </div>
      <div class="header">
        <h1>Список заметок</h1>
        <Tabs :tabs="tabs" v-model:selected="selectedTab" />
      </div>
      <div class="logs-container">
        <LogCard
          v-for="log in sortedLogs"
          :log="log"
          :quest="getLogsQuest(log)"
          :showContext="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import LogCard from "../components/LogCard.vue";
import { sortByCreatedAt } from "../utils/sort";
import { filterObjects } from "../utils/filter";
import Tabs from "../components/Tabs.vue";

const store = useStore();

const tabs = [
  {
    label: "По убыванию ↓",
    key: "desc",
  },
  { label: "По возрастанию ↑", key: "asc" },
];

const selectedTab = ref("desc");

const logs = computed(() => store.getters["logs/allLogs"]);
const quests = computed(() => store.getters["quests/allQuests"]);

const getLogsQuest = (log) =>
  quests.value.find((quest) => log.questId === quest.id);

const searchFilter = ref("");

const searchedLogs = computed(() =>
  filterObjects(logs.value, "title", searchFilter.value)
);

const sortedLogs = computed(() =>
  selectedTab.value === "desc"
    ? sortByCreatedAt(searchedLogs.value, true)
    : sortByCreatedAt(searchedLogs.value, false)
);
</script>

<style scoped>
.container {
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    width: 440px;

    h3 {
      text-align: center;
    }

    input {
      width: 100%;
    }
  }
}

.content {
  width: 960px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logs-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: var(--color-bg-lighter);
}
</style>
