<template>
  <div
    class="card-container elevate"
    :class="{ selected }"
    @click="$emit('select')"
  >
    <header class="card-header">
      <h3>{{ quest.title }}</h3>
      <ContextMenu :items="['update', 'delete']" @update="" @delete="" />
    </header>
    <p class="card-text">{{ quest.description }}</p>
    <ProgressBar :percentage="quest.percentage" />
    <p
      class="due-date"
      :class="hasDueDatePassed(quest.dueDate) ? 'overdue' : ''"
    >
      До {{ formatDateToDDMM(quest.dueDate) }}
    </p>
    <button
      v-if="!quest.completed && quest.percentage === 100"
      class="primary"
      @click="emit('complete', quest.id)"
    >
      Завершить
    </button>
  </div>
</template>

<script setup>
import ContextMenu from "./ContextMenu.vue";
import ProgressBar from "./ProgressBar.vue";
import { formatDateToDDMM } from "../utils/dates.js";

const props = defineProps({
  quest: Object,
  selected: Boolean,
});

const emit = defineEmits(["select", "update", "delete", "complete"]);

const hasDueDatePassed = (date) => {
  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return inputDate < today;
};
</script>

<style scoped>
.due-date {
  width: 100%;
  text-align-last: right;
  color: var(--color-muted);
  font-size: 10px;
}

.overdue {
  color: var(--color-accent-danger);
}
</style>
