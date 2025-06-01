<template>
  <div>
    <header class="column-header">
      <h2>Цели</h2>
    </header>
    <div class="column-container">
      <PlusButton :wide="true" @click="createGoal" />
      <GoalCard
        v-for="goal in goals"
        :key="goal.id"
        :goal="goal"
        :selected="goal.id === selectedGoalId"
        @select="select(goal.id)"
        @update="openModal(goal)"
        @delete="deleteGoal(goal.id)"
      />
      <GoalModal
        :isOpen="modalVisible"
        :goal="modalGoal"
        @close="closeModal"
        @save="updateGoal"
      />
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

const modalVisible = ref(false);

function select(id) {
  store.commit("goals/setSelectedGoalId", id);
}

const modalGoal = ref(null);

const openModal = (goal) => {
  modalGoal.value = goal;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const createGoal = () => {
  store.dispatch("goals/createGoal");
};

const updateGoal = (newGoal) => {
  console.log(newGoal);
  store.dispatch("goals/updateGoal", newGoal);
};

const deleteGoal = (id) => {
  store.dispatch("goals/deleteGoal", id);
};
</script>

<style scoped></style>
