<template>
  <div>
    <div class="column-header">
      <h2>Задачи</h2>
    </div>
    <div class="column-container">
      <PlusButton @click="" />
      <TaskCard :task="mockTask1" />
      <TaskCard :task="mockTask2" />
      <draggable :list="tasks" group="tasks" item-key="id" :sort="false">
        <template #item="{ element }">
          <TaskCard
            :task="element"
            @toggle="toggle(element)"
            @increase="increase(element)"
            @decrease="decrease(element)"
            @edit="openModal(element)"
            @remove="removeTask(element)"
          />
        </template>
      </draggable>
    </div>
  </div>
  <TaskModal
    v-if="modalVisible"
    :task="selectedTask"
    :questId="questId"
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
const selectedTask = ref(null);

function openModal(task) {
  selectedTask.value = task;
  modalVisible.value = true;
}

function closeModal() {
  modalVisible.value = false;
  selectedTask.value = null;
}

function toggle(task) {
  store.dispatch("tasks/updateTask", {
    id: task.id,
    done: !task.done,
  });
}

function increase(task) {
  if (task.value < task.max) {
    store.dispatch("tasks/updateTask", {
      id: task.id,
      value: task.value + 1,
    });
  }
}

function decrease(task) {
  if (task.value > 0) {
    store.dispatch("tasks/updateTask", {
      id: task.id,
      value: task.value - 1,
    });
  }
}

function removeTask(task) {
  store.dispatch("tasks/deleteTask", task.id);
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
</style>
