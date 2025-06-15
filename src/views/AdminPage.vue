<template>
  <div class="container">
    <div class="content">
      <div class="general-stats">
        <header><h3>Общая статиситка</h3></header>
        <div class="general-data">
          <p>Всего пользователей: {{ users?.length || 0 }}</p>
          <p>Всего целей: {{ allGoals?.length || 0 }}</p>
          <p>Всего целей завершено: {{ allCompletedGoals?.length || 0 }}</p>
          <p>Всего заданий: {{ allQuests?.length || 0 }}</p>
          <p>Всего заданий завершено: {{ allCompletedQuests?.length || 0 }}</p>
          <p>Всего задач: {{ allTasks?.length || 0 }}</p>
          <p>Всего задач завершено: {{ allCompletedTasks?.length || 0 }}</p>
        </div>
      </div>
      <div class="user-column">
        <header><h3>Статистика пользователя</h3></header>
        <select v-model="selectedUserId">
          <option :value="null">Пользователь не выбран</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
        <div class="user-data" v-if="selectedUserId">
          <img :src="selectedUser?.picture" />
          <div class="text">
            <p>{{ selectedUser?.name }}</p>
            <p>{{ selectedUser?.email }}</p>
          </div>
        </div>
        <p>
          Количество целей пользователя: {{ selectedUserGoals?.length || 0 }}
        </p>
        <p>
          Количество заданий пользователя: {{ selectedUserQuests?.length || 0 }}
        </p>
        <p>
          Количество задач пользователя: {{ selectedUserTasks?.length || 0 }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const users = computed(() => store.getters["user/allUsers"]);

const selectedUserId = ref(null);
const selectedUser = computed(() =>
  users.value.find((u) => u.id === selectedUserId.value)
);

const selectedUserGoals = computed(() =>
  allGoals.value.filter((g) => g.userId === selectedUserId.value)
);
const selectedUserQuests = computed(() =>
  allQuests.value.filter((q) => q.userId === selectedUserId.value)
);
const selectedUserTasks = computed(() =>
  allTasks.value.filter((t) => t.userId === selectedUserId.value)
);

const allGoals = computed(() => store.getters["admin/allGoals"]);
const allQuests = computed(() => store.getters["admin/allQuests"]);
const allTasks = computed(() => store.getters["admin/allTasks"]);

const allCompletedGoals = computed(() =>
  allGoals.value.filter((g) => g.completed)
);
const allCompletedQuests = computed(() =>
  allQuests.value.filter((q) => q.completed)
);
const allCompletedTasks = computed(() =>
  allTasks.value.filter((t) => t.completed)
);

onMounted(async () => {
  store.dispatch("user/fetchAllUsers");
  store.dispatch("admin/fetchGoals");
  store.dispatch("admin/fetchQuests");
  store.dispatch("admin/fetchTasks");
});
</script>

<style scoped>
.container {
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-muted);
}

h3 {
  font-size: 24px;
}

.content {
  width: 960px;
  display: flex;
  gap: 36px;

  .general-stats {
    padding: 16px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-lighter);
    gap: 24px;
    font-size: 16px;
    flex: 1;
  }

  .general-data {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 16px;
  }

  .user-column {
    padding: 16px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-lighter);
    gap: 16px;
    flex: 1;
  }

  .user-data {
    display: flex;
    padding: 16px;
    background-color: var(--color-surface);
    gap: 16px;
    align-items: center;
    border-radius: 4px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 16px;
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: 16px;
      font-size: 12px;
    }
  }
}
</style>
