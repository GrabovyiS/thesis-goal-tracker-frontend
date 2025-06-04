<template>
  <div>
    <div class="column-header">
      <h2>Квесты</h2>
      <Tabs :tabs="tabs" v-model:selected="selectedTab" />
    </div>
    <div class="column-container">
      <PlusButton @click="createQuest" :wide="true" />
      <QuestCard
        v-for="quest in filteredQuests"
        :key="quest.id"
        :quest="quest"
        :selected="quest.id === selectedQuestId"
        @select="select(quest.id)"
        @update="openModal(quest)"
        @complete="completeQuest(quest)"
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
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import QuestCard from "./QuestCard.vue";
import QuestModal from "./QuestModal.vue";
import PlusButton from "./PlusButton.vue";
import { filterObjects } from "../utils/filter";
import Tabs from "./Tabs.vue";
import { filterByTabs, tabs } from "../utils/tabs";

const props = defineProps(["searchFilter"]);

const store = useStore();
const goalId = computed(() => store.getters["goals/selectedGoalId"]);
const quests = computed(() =>
  store.getters["quests/questsByGoal"](goalId.value)
);

const searchedQuests = computed(() =>
  filterObjects(quests.value, "title", props.searchFilter)
);

const selectedTab = ref("ongoing");

const filteredQuests = computed(() =>
  filterByTabs(searchedQuests.value, selectedTab.value)
);

const selectedQuestId = computed(() => store.getters["quests/selectedQuestId"]);

watch(
  () => filteredQuests.value,
  (newQuests) => {
    if (newQuests.length === 0) {
      return;
    }

    if (!newQuests.find((q) => q.id === selectedQuestId.value)) {
      const firstVisibleQuest = newQuests[0];
      store.commit("quests/setSelectedQuestId", firstVisibleQuest.id);
    }
  }
);

const modalVisible = ref(false);

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

const completeQuest = (quest) => {
  store.dispatch("quests/completeQuest", quest);
};

const updateQuest = (newQuest) => {
  store.dispatch("quests/updateQuest", newQuest);
};
</script>

<style scoped></style>
