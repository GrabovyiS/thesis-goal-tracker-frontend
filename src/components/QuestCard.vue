<template>
  <div
    class="card-container elevate"
    :class="[{ selected }, quest.completed ? 'completed' : '']"
    @click="$emit('select')"
  >
    <header class="card-header">
      <h3>{{ quest.title }}</h3>
      <ContextMenu
        v-if="showContext"
        :items="['update', 'delete']"
        @update="emit('update')"
        @delete="emit('delete', quest.id)"
      />
    </header>
    <p class="card-text">{{ quest.description }}</p>
    <ProgressBar :percentage="progress" />
    <p
      class="due-date"
      :class="hasDueDatePassed(quest.deadline) ? 'overdue' : ''"
      v-if="quest.deadline"
    >
      До {{ formatDateToDDMM(quest.deadline) }}
    </p>
    <button
      v-if="!quest.completed && progress === 100 && showContext"
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
import { computed } from "vue";
import { useStore } from "vuex";
import { formatDateToDDMM } from "../utils/dates.js";
import { getProgressFromTasks } from "../utils/progress.js";

const props = defineProps({
  quest: Object,
  selected: Boolean,
  showContext: {
    type: Boolean,
    default() {
      return true;
    },
  },
});

const emit = defineEmits(["select", "update", "delete", "complete"]);
const store = useStore();

const hasDueDatePassed = (date) => {
  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return inputDate < today;
};

const tasks = computed(() =>
  store.getters["tasks/tasksByQuest"](props.quest.id)
);

const progress = computed(() => getProgressFromTasks(tasks.value));
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
