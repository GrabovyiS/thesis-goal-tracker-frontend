<template>
  <div
    class="card-container elevate"
    :class="{ selected }"
    @click="$emit('select')"
  >
    <header class="card-header">
      <h3>{{ goal.title }}</h3>
      <ContextMenu
        :items="['update', 'delete']"
        @update="emit('update')"
        @delete="emit('delete')"
      />
    </header>
    <p class="card-text">{{ goal.description }}</p>
    <ProgressBar :percentage="Math.floor(goal.percentage)" />
    <button
      v-if="!goal.completed && goal.percentage === 100"
      class="primary"
      @click="emit('complete', goal.id)"
    >
      Завершить
    </button>
  </div>
</template>

<script setup>
import ContextMenu from "./ContextMenu.vue";
import ProgressBar from "./ProgressBar.vue";

const props = defineProps({
  goal: Object,
  selected: Boolean,
});

const emit = defineEmits(["select", "update", "delete", "complete"]);
</script>

<style scoped></style>
