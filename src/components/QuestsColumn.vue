<template>
  <div>
    <div class="column-header">
      <h2>Квесты</h2>
    </div>
    <div class="column-container">
      <PlusButton @click="" :wide="true" />
      <QuestCard
        :quest="mockQuest"
        :selected="mockQuest.id === selectedQuestId"
        @select="select(mockQuest.id)"
        @edit="openModal(mockQuest)"
        @delete=""
      />
      <QuestCard
        v-for="quest in quests"
        :key="quest.id"
        :quest="quest"
        :selected="quest.id === selectedQuestId"
        @select="select(quest.id)"
        @edit="openModal(quest)"
      />
    </div>
  </div>
  <QuestModal
    v-if="modalVisible"
    :goalId="goalId"
    :quest="selectedQuest"
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

function openModal(quest) {
  selectedQuest.value = quest;
  modalVisible.value = true;
}
</script>

<style scoped></style>
