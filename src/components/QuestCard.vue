<template>
  <div class="card" :class="{ selected }" @click="$emit('select')">
    <div class="top">
      <div class="info">
        <h3>{{ quest.title }}</h3>
        <p class="desc">{{ quest.description }}</p>
      </div>
      <button class="edit" @click.stop="$emit('edit')">✎</button>
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: '50%' }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  quest: Object,
  selected: Boolean
})
defineEmits(['select', 'edit'])
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
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.edit {
  background: none;
  border: 1px solid #595E68;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.desc {
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 4px;
}
.progress-bar {
  height: 6px;
  background-color: #22252c;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 12px;
}
.progress {
  background-color: var(--color-accent-orange);
  height: 100%;
}
</style>