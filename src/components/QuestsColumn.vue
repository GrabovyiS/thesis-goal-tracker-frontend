<template>
  <div class="column">
    <div class="header">
      <h2>Квесты</h2>
      <button @click="openModal(null)">+</button>
    </div>
    <QuestCard
      v-for="quest in quests"
      :key="quest.id"
      :quest="quest"
      :selected="quest.id === selectedQuestId"
      @select="select(quest.id)"
      @edit="openModal(quest)"
    />
    <QuestModal
      v-if="modalVisible"
      :goalId="goalId"
      :quest="selectedQuest"
      @close="modalVisible = false"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import QuestCard from './QuestCard.vue'
import QuestModal from './QuestModal.vue'

const store = useStore()
const goalId = computed(() => store.getters['goals/selectedGoalId'])
const quests = computed(() => store.getters['quests/questsByGoal'](goalId.value))
const selectedQuestId = computed(() => store.getters['quests/selectedQuestId'])

const selectedQuest = ref(null)
const modalVisible = ref(false)

function select(id) {
  store.commit('quests/setSelectedQuestId', id)
}

function openModal(quest) {
  selectedQuest.value = quest
  modalVisible.value = true
}
</script>

<style scoped>
.column {
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
</style>