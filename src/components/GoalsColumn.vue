<template>
  <div class="column">
    <div class="header">
      <h2>Цели</h2>
      <button @click="openModal">+</button>
    </div>
    <GoalCard
      v-for="goal in goals"
      :key="goal.id"
      :goal="goal"
      :selected="goal.id === selectedGoalId"
      @select="select(goal.id)"
    />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import GoalCard from './GoalCard.vue'

const store = useStore()
const goals = computed(() => store.getters['goals/allGoals'])
const selectedGoalId = computed(() => store.getters['goals/selectedGoalId'])

const emit = defineEmits(['open'])

function openModal() {
  emit('open')
}

function select(id) {
  store.commit('goals/setSelectedGoalId', id)
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