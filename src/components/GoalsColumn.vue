<template>
  <div>
    <header class="column-header">
      <h2>Цели</h2>
    </header>
    <div class="column-container">
      <PlusButton :wide="true" @click="openModal" />
      <GoalCard
        :goal="mockGoal"
        :selected="mockGoal.id === selectedGoalId"
        @select="select(mockGoal.id)"
        @update=""
        @delete=""
      />
      <GoalCard
        v-for="goal in goals"
        :key="goal.id"
        :goal="goal"
        :selected="goal.id === selectedGoalId"
        @select="select(goal.id)"
      />
      <GoalModal :isOpen="modalVisible" @close="closeModal" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import GoalCard from "./GoalCard.vue";
import GoalModal from "./GoalModal.vue";
import PlusButton from "./PlusButton.vue";

const store = useStore();
const goals = computed(() => store.getters["goals/allGoals"]);
const selectedGoalId = computed(() => store.getters["goals/selectedGoalId"]);

const mockGoal = {
  id: "asdf",
  title: "Название цели",
  description:
    "Некоторое описание цели с более маленькими буквами которое даёт ненмого контекста",
  percentage: 100,
  completed: false,
};

const modalVisible = ref(false);

function select(id) {
  store.commit("goals/setSelectedGoalId", id);
}

const openModal = () => {
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};
</script>

<style scoped></style>
