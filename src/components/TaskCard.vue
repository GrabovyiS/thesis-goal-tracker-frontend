<template>
  <div
    class="card-container elevate"
    :class="task.completed ? 'completed' : ''"
  >
    <header class="card-header">
      <h3>{{ task.title }}</h3>
      <ContextMenu
        v-if="showContext"
        :items="['update', 'delete']"
        :left="activeTask"
        @update="emit('update')"
        @delete="emit('delete')"
      />
    </header>
    <p class="card-text">{{ task.description }}</p>
    <div class="interactive-container">
      <template v-if="task.type === 'checkbox'">
        <div :class="task.completed ? 'pointer-events-none' : ''">
          <Checkbox v-model="task.done" @click="emit('toggle')" />
        </div>
      </template>
      <template v-else-if="task.type === 'progress'">
        <div :class="task.completed ? 'pointer-events-none' : ''">
          <ProgressCounter
            :value="Number(task.value)"
            :max="task.max"
            @minus="emit('decrease')"
            @plus="emit('increase')"
          />
        </div>
      </template>

      <div class="file-tags">
        <FileTag v-for="file in task.files" :file="file" :downloadable="true" />
      </div>
    </div>

    <button
      v-if="
        !task.completed &&
        showContext &&
        (task.type === 'checkbox' ? task.done : task.value === task.max)
      "
      class="primary"
      @click="emit('complete')"
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
  activeTask: {
    type: Boolean,
    default() {
      return false;
    },
  },
  showContext: {
    type: Boolean,
    default() {
      return true;
    },
  },
});

const emit = defineEmits([
  "update",
  "toggle",
  "increase",
  "decrease",
  "delete",
  "complete",
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
