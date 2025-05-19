<template>
  <div class="card" :class="{ selected }" @click="$emit('select')">
    <h3>{{ goal.title }}</h3>
    <p>{{ goal.description }}</p>
    <div class="progress-bar">
      <div class="progress" :style="{ width: '50%' }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  goal: Object,
  selected: Boolean
})
defineEmits(['select'])
</script>

<style scoped>
.card {
  background-color: var(--color-surface);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #595E68;
  cursor: pointer;
}
.card.selected {
  border: 2px solid var(--color-accent-blue);
}
.progress-bar {
  height: 6px;
  background-color: #22252c;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
}
.progress {
  background-color: var(--color-accent-orange);
  height: 100%;
}
</style>