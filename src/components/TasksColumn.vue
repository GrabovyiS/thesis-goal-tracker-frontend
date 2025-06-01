<template>
  <div>
    <div class="column-header">
      <h2>Задачи</h2>
    </div>
    <div class="column-container">
      <PlusButton @click="createTask" />
      <draggable
        :list="tasks"
        group="tasks"
        item-key="id"
        :sort="false"
        class="draggable-container"
      >
        <template #item="{ element }">
          <TaskCard
            :task="element"
            @toggle="toggle(element)"
            @increase="increase(element)"
            @decrease="decrease(element)"
            @update="openModal(element)"
            @delete="deleteTask(element)"
          />
        </template>
      </draggable>
    </div>
  </div>
  <TaskModal
    :isOpen="modalVisible"
    :task="modalTask"
    @save="updateTask"
    @close="closeModal"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import TaskCard from "./TaskCard.vue";
import TaskModal from "./TaskModal.vue";
import draggable from "vuedraggable";
import PlusButton from "./PlusButton.vue";
import { toRawDeep } from "../utils/toRawDeep";

const store = useStore();
const questId = computed(() => store.getters["quests/selectedQuestId"]);
const tasks = computed(() =>
  store.getters["tasks/tasksByQuest"](questId.value)
);

const mockTask1 = {
  id: "asdfs",
  title: "Название задачи",
  description:
    "Краткое описание задачи с несколькими словами и маленькими буквами",
  type: "checkbox",
  done: true,
  files: [
    {
      id: "...",
      name: "example.pdf",
      mimeType: "application/pdf",
      taskId: "asss",
      createdAt: "...",
      updatedAt: "...",
    },
  ],
};

const mockTask2 = {
  id: "asdfs",
  title: "Название задачи 2",
  description:
    "Краткое описание задачи с несколькими словами и маленькими буквами",
  type: "progress",
  value: 0,
  max: 5,
  files: [
    {
      id: "...",
      name: "example.pdf",
      mimeType: "application/pdf",
      taskId: "asss",
      createdAt: "...",
      updatedAt: "...",
    },
    {
      id: "...",
      name: "example2.jpeg",
      mimeType: "application/pdf",
      taskId: "asss",
      createdAt: "...",
      updatedAt: "...",
    },
  ],
};

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

const createTask = () => {
  store.dispatch("tasks/createTask", questId.value);
};

const updateTask = ({ task, files }) => {
  task.files = files;
  store.dispatch("tasks/updateTask", task);
};

const deleteTask = (task) => {
  store.dispatch("tasks/deleteTask", task.id);
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
</style>
