<template>
  <div class="container">
    <div class="search">
      <h3>Поиск</h3>
      <input type="text" v-model="searchFilter" />
    </div>

    <div class="dashboard">
      <GoalsColumn :searchFilter />
      <QuestsColumn :searchFilter />
      <TasksColumn :searchFilter />
      <ActiveTasksColumn :searchFilter />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import GoalsColumn from "../components/GoalsColumn.vue";
import QuestsColumn from "../components/QuestsColumn.vue";
import TasksColumn from "../components/TasksColumn.vue";
import ActiveTasksColumn from "../components/ActiveTasksColumn.vue";

const searchFilter = ref("");
</script>

<style scoped>
.dashboard {
  padding: 48px;
  padding-top: 36px;
  padding-bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 32px;
}

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
</style>
