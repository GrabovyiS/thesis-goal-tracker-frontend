<template>
  <div>
    <div class="column-header">
      <h2>Текущие задачи</h2>
    </div>

    <draggable
      group="tasks"
      item-key="id"
      :list="searchedInternalList"
      @change="onChange"
      class="column-container"
    >
      <template #item="{ element }">
        <TaskCard
          :task="element"
          removeTooltip="Удалить из текущих"
          @toggle="toggle(element)"
          @remove="removeTask(element)"
        />
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";
import { filterObjects } from "../utils/filter";
import { Pointer } from "lucide-vue-next";

const props = defineProps(["searchFilter"]);

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

const searchedInternalList = computed(() => {
  const list = filterObjects(internalList.value, "title", props.searchFilter);
  return list;
});

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

.empty-drop-zone {
  background-color: var(--color-bg-lighter);
  border: 1px solid var(--color-border);
  color: var(--color-border);
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
