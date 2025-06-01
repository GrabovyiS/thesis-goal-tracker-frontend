<template>
  <div class="card-container elevate">
    <header class="card-header">
      <h3>{{ task.title }}</h3>
      <ContextMenu
        :items="['update', 'delete']"
        @update="emit('update')"
        @delete="emit('delete')"
      />
    </header>
    <p class="card-text">{{ task.description }}</p>
    <div class="interactive-container">
      <template v-if="task.type === 'checkbox'">
        <Checkbox v-model="task.done" @click="emit('toggle')" />
      </template>
      <template v-else-if="task.type === 'progress'">
        <ProgressCounter
          :value="task.value"
          :max="task.max"
          @minus="emit('decrease')"
          @plus="emit('increase')"
        />
      </template>

      <div class="file-tags">
        <FileTag v-for="file in task.files" :file="file" :downloadable="true" />
      </div>
    </div>

    <button
      v-if="
        !task.completed &&
        (task.type === 'checkbox' ? task.done : task.value === task.max)
      "
      class="primary"
      @click="emit('complete', quest.id)"
    >
      Завершить
    </button>
  </div>
</template>

<script setup>
import FileTag from "./FileTag.vue";
import ProgressCounter from "./ProgressCounter.vue";
import ContextMenu from "./ContextMenu.vue";
import Checkbox from "./Checkbox.vue";

defineProps({
  task: Object,
  removeTooltip: String,
});

const emit = defineEmits([
  "update",
  "toggle",
  "increase",
  "decrease",
  "delete",
]);
</script>

<style scoped>
.interactive-container {
  display: flex;
  gap: 8px;
}

.file-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
