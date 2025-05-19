<template>
  <div class="card">
    <div class="top">
      <div class="info">
        <h3>{{ task.title }}</h3>
        <p v-if="task.description" class="desc">{{ task.description }}</p>
      </div>
      <div class="actions">
        <button
          v-if="task.type === 'checkbox'"
          class="check-btn"
          :class="{ done: task.done }"
          @click.stop="$emit('toggle', task)"
        >
          ✓
        </button>
        <div v-if="task.type === 'progress'" class="counter">
          <button @click.stop="$emit('decrease', task)">−</button>
          <span>{{ task.value || 0 }}/{{ task.max || 0 }}</span>
          <button @click.stop="$emit('increase', task)">+</button>
        </div>
        <button
          class="edit-btn"
          title="Редактировать"
          @click.stop="$emit('edit', task)"
        >
          ✎
        </button>
        <button
          class="remove-btn"
          :title="removeTooltip || 'Удалить'"
          @click.stop="$emit('remove', task)"
        >
          🗑
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: Object,
  removeTooltip: String,
});
defineEmits(["edit", "toggle", "increase", "decrease", "remove"]);
</script>

<style scoped>
.card {
  background-color: var(--color-surface);
  border: 1px solid #595e68;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  color: white;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.check-btn {
  background-color: transparent;
  border: 1px solid #595e68;
  border-radius: 4px;
  padding: 4px 8px;
  color: white;
  cursor: pointer;
}
.check-btn.done {
  background-color: var(--color-accent-orange);
  color: black;
}
.counter {
  display: flex;
  gap: 6px;
  align-items: center;
}
.counter button {
  background-color: var(--color-accent-blue);
  border: none;
  border-radius: 4px;
  padding: 2px 8px;
  color: white;
  cursor: pointer;
}
.desc {
  margin-top: 6px;
  font-size: 0.9rem;
  color: #ccc;
}
.remove-btn,
.edit-btn {
  background: none;
  border: 1px solid #595e68;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.remove-btn:hover {
  background-color: #5b2b2b;
}
.edit-btn:hover {
  background-color: #2e2e2e;
}
</style>
