<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";

const store = useStore();
const internalList = ref([]);

onMounted(async () => {
  await store.dispatch("activeTasks/fetchActiveTasks");
  internalList.value = store.getters["activeTasks/allActiveTasks"];
});

watch(
  () => store.getters["activeTasks/allActiveTasks"],
  (val) => {
    internalList.value = [...val];
  }
);

function onChange(event) {
  if (!event?.to?.children) return;

  const reordered = Array.from(event.to.children)
    .map((el) => el.__draggable_context?.element)
    .filter(Boolean);

  internalList.value = reordered;
  const ids = reordered.map((t) => t.id);
  store.dispatch("activeTasks/reorderActiveTasks", ids);
}

function toggle(task) {
  store.dispatch("tasks/updateTask", {
    id: task.id,
    done: !task.done,
  });
}

function removeTask(task) {
  store.dispatch("activeTasks/removeActiveTask", task.id);
  internalList.value = internalList.value.filter((t) => t.id !== task.id);
}
</script>

<template>
  <div class="column">
    <div class="header">
      <h2>Текущие задачи</h2>
    </div>
    <div class="container">
      <draggable
        group="tasks"
        item-key="id"
        :list="internalList"
        @change="onChange"
      >
        <template #item="{ element }">
          <TaskCard
            v-if="element"
            :task="element"
            removeTooltip="Удалить из текущих"
            @toggle="toggle(element)"
            @remove="removeTask(element)"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

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
.container {
  padding: 16px;
  background-color: var(--color-bg-lighter);
  border-radius: 16px;
}
</style>
