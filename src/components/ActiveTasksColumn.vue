<template>
  <div>
    <div class="column-header">
      <h2>Текущие задачи</h2>
    </div>

    <draggable
      :group="{ name: 'tasks', pull: false, put: true }"
      item-key="id"
      :list="internalList"
      @add="onAdd"
      @update="onUpdate"
      class="column-container"
      :animation="250"
      ghost-class="ghost"
      chosen-class="chosen"
      drag-class="drag"
    >
      <template #item="{ element }">
        <TaskCard
          :task="element"
          :activeTask="true"
          removeTooltip="Удалить из текущих"
          @toggle="toggle(element)"
          @increase="increase(element)"
          @decrease="decrease(element)"
          @update="openModal(element)"
          @delete="removeActiveTask(element)"
          @complete="completeTask(element)"
        />
      </template>
    </draggable>
  </div>
  <TaskModal
    :isOpen="modalVisible"
    :task="modalTask"
    @save="updateTask"
    @close="closeModal"
  />
</template>

<script setup>
import { ref, onMounted, watchEffect, computed, nextTick } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";
import { filterObjects } from "../utils/filter";
import { Pointer } from "lucide-vue-next";
import { toRawDeep } from "../utils/toRawDeep";
import TaskModal from "./TaskModal.vue";

const props = defineProps(["searchFilter"]);

const store = useStore();
const internalList = ref([]);

const tasks = computed(() => store.getters["tasks/allTasks"]);
const activeTasks = computed(() => store.getters["tasks/allActiveTasks"]);

onMounted(async () => {
  await store.dispatch("tasks/fetchActiveTasks");
  internalList.value = store.getters["tasks/allActiveTasks"];
});

watchEffect(() => {
  const newTasks = tasks.value;
  const newActiveTasks = activeTasks.value;

  internalList.value = [...newActiveTasks];
});

const searchedInternalList = computed(() => {
  const list = filterObjects(internalList.value, "title", props.searchFilter);
  return list;
});

async function onAdd(event) {
  const task = event.item.__draggable_context?.element;
  if (!task) return;

  const filteredIndex = event.newIndex;
  const filteredTargetTask = searchedInternalList.value[filteredIndex];

  let insertIndex;
  if (filteredTargetTask) {
    insertIndex = internalList.value.findIndex(
      (t) => t.id === filteredTargetTask.id
    );
  } else {
    insertIndex = internalList.value.length;
  }

  store.dispatch("tasks/addActiveTask", {
    taskId: task.id,
    position: insertIndex,
  });
}

function onUpdate(event) {
  const reordered = Array.from(event.to.children)
    .map((el) => el.__draggable_context?.element)
    .filter(Boolean);

  internalList.value = reordered;
  const ids = reordered.map((t) => t.id);
  store.dispatch("tasks/reorderActiveTasks", ids);
}

function removeActiveTask(task) {
  internalList.value = internalList.value.filter((t) => t.id !== task.id);
  store.dispatch("tasks/removeActiveTask", task.id);
}

const modalVisible = ref(false);
const modalTask = ref(null);

function openModal(task) {
  modalTask.value = task;
  modalVisible.value = true;
}

const closeModal = () => {
  modalVisible.value = false;
};

const toggle = (task) => {
  task.done = !task.done;
  store.dispatch("tasks/updateTask", toRawDeep(task));

  if (task.done) {
    store.dispatch("notifications/notifyValuePlus");
  } else {
    store.dispatch("notifications/notifyValueMinus");
  }
};

const increase = (task) => {
  if (task.value < task.max) {
    task.value++;
    store.dispatch("tasks/updateTask", task);
  }
};

const decrease = (task) => {
  if (task.value > 0) {
    task.value--;
    store.dispatch("tasks/updateTask", task);
  }
};

const updateTask = ({ task, files }) => {
  task.files = files;
  store.dispatch("tasks/updateTask", task);
};

const completeTask = (task) => {
  store.dispatch("tasks/completeTask", task);
};
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
