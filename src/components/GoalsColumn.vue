<template>
  <div>
    <header class="column-header">
      <h2>Цели</h2>
      <Tabs :tabs="tabs" v-model:selected="selectedTab" />
    </header>
    <div class="column-container">
      <PlusButton :wide="true" @click="createGoal" />
      <GoalCard
        v-for="goal in sortedGoals"
        :key="goal.id"
        :goal="goal"
        :selected="goal.id === selectedGoalId"
        @select="select(goal.id)"
        @update="openModal(goal)"
        @complete="completeGoal(goal)"
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
import { computed, onMounted, ref, watch } from "vue";
import GoalCard from "./GoalCard.vue";
import GoalModal from "./GoalModal.vue";
import PlusButton from "./PlusButton.vue";
import { filterObjects } from "../utils/filter";
import Tabs from "./Tabs.vue";
import { filterByTabs } from "../utils/tabs";
import { tabs } from "../utils/tabs";
import { sortByCreatedAt } from "../utils/sort";

const props = defineProps(["searchFilter"]);

const selectedTab = ref("ongoing");

const store = useStore();

const goals = computed(() => store.getters["goals/allGoals"]);
const selectedGoalId = computed(() => store.getters["goals/selectedGoalId"]);

const searchedGoals = computed(() =>
  filterObjects(goals.value, "title", props.searchFilter)
);

const filteredGoals = computed(() =>
  filterByTabs(searchedGoals.value, selectedTab.value)
);

watch(
  () => filteredGoals.value,
  (newGoals) => {
    if (!newGoals.find((g) => g.id === selectedGoalId.value)) {
      const firstVisibleGoal = newGoals[0];
      store.commit("goals/setSelectedGoalId", firstVisibleGoal.id);
    }
  }
);

const sortedGoals = computed(() => sortByCreatedAt(filteredGoals.value, true));

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
  store.dispatch("goals/updateGoal", newGoal);
};

const completeGoal = (goal) => {
  store.dispatch("goals/completeGoal", goal);
};

const deleteGoal = (id) => {
  store.dispatch("goals/deleteGoal", id);
};
</script>

<style scoped></style>
