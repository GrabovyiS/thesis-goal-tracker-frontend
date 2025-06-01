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
    <ProgressBar :percentage="progress" />
    <button
      v-if="!goal.completed && progress === 100"
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
import { useStore } from "vuex";
import { getProgressFromTasks } from "../utils/progress";
import { computed } from "vue";

const props = defineProps({
  goal: Object,
  selected: Boolean,
});

const store = useStore();

const quests = computed(() =>
  store.getters["quests/questsByGoal"](props.goal.id)
);

const tasks = computed(() =>
  quests.value.reduce((acc, currQuest) => {
    {
      const tasks = store.getters["tasks/tasksByQuest"](currQuest.id);
      acc.push(...tasks);
      return acc;
    }
  }, [])
);

const progress = computed(() => getProgressFromTasks(tasks.value));

const emit = defineEmits(["select", "update", "delete", "complete"]);
</script>

<style scoped></style>
