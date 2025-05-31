<template>
  <div>
    <div class="column-header">
      <h2>Квесты</h2>
    </div>
    <div class="column-container">
      <PlusButton @click="createQuest" :wide="true" />
      <QuestCard
        v-for="quest in quests"
        :key="quest.id"
        :quest="quest"
        :selected="quest.id === selectedQuestId"
        @select="select(quest.id)"
        @update="openModal(quest)"
        @delete="deleteQuest"
      />
    </div>
  </div>
  <QuestModal
    :isOpen="modalVisible"
    :quest="modalQuest"
    @save="updateQuest"
    @close="modalVisible = false"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import QuestCard from "./QuestCard.vue";
import QuestModal from "./QuestModal.vue";
import PlusButton from "./PlusButton.vue";

const store = useStore();
const goalId = computed(() => store.getters["goals/selectedGoalId"]);
const quests = computed(() =>
  store.getters["quests/questsByGoal"](goalId.value)
);
const selectedQuestId = computed(() => store.getters["quests/selectedQuestId"]);

const selectedQuest = ref(null);
const modalVisible = ref(false);

const mockQuest = {
  id: "asdf",
  dueDate: "2025-05-23T17:42:15.123Z",
  title: "Название квеста",
  description:
    "Короткое описание квеста коиорое дает некоторое количество необязательного контекста",
  percentage: 90,
};

function select(id) {
  store.commit("quests/setSelectedQuestId", id);
}

const modalQuest = ref(null);

const openModal = (quest) => {
  modalVisible.value = true;
  modalQuest.value = quest;
};

const createQuest = () => {
  store.dispatch("quests/createQuest", goalId.value);
};

const deleteQuest = (id) => {
  store.dispatch("quests/deleteQuest", id);
};

const updateQuest = (newQuest) => {
  store.dispatch("quests/updateQuest", newQuest);
};
</script>

<style scoped></style>
