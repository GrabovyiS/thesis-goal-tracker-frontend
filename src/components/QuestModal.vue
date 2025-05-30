<template>
  <Modal :isOpen="isOpen" modalType="Квест" @close="emit('close')">
    <EditableHeader
      @update="(newTitle) => (questCopy.title = newTitle)"
      :value="questCopy.title"
    />
    <input type="text" v-model="questCopy.description" />
    <h3>История цели</h3>
    <div class="modal-list">
      <LogCard v-for="log in logs" :log="log" :quest="questCopy" />
    </div>
    <h3>Связанные задачи</h3>
    <div class="modal-list">
      <TaskCard v-for="task in tasks" :task="task" />
    </div>
    <h3>Прогресс квеста</h3>
    <div class="modal-list progress">
      <ProgressBar :percentage="11" />
    </div>
    <div class="buttons">
      <button class="danger" @click="emit('delete', quest.id)">
        Удалить квест
      </button>
      <button class="primary" @click="emit('save', questCopy.value)">
        Сохранить
      </button>
    </div>
  </Modal>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Modal from "./Modal.vue";
import EditableHeader from "./EditableHeader.vue";
import { toRawDeep } from "../utils/toRawDeep";
import LogCard from "./LogCard.vue";
import ProgressBar from "./ProgressBar.vue";
import TaskCard from "./TaskCard.vue";

const emit = defineEmits(["close", "delete", "save"]);
const store = useStore();

const props = defineProps(["quest", "isOpen"]);

const mockFile = {
  id: "...",
  name: "example.pdf",
  mimeType: "application/pdf",
  taskId: "asss",
  createdAt: "...",
  updatedAt: "...",
};

const mockLog = {
  id: "dszxcv",
  questId: "asdfdf",
  title: "Название лога",
  description:
    "Текст заметки текст заметки текст заметки текст заметки текст заметки текст заметки текст заметки текстзаметки текстзаметки текстзаметки текст",
  files: [mockFile],
  updatedAt: "2025-05-23",
};

const mockQuest = {
  id: "asdf",
  dueDate: "2025-05-23T17:42:15.123Z",
  title: "Название квеста",
  description:
    "Короткое описание квеста коиорое дает некоторое количество необязательного контекста",
  percentage: 90,
  goalId: "asdf",
};

const logs = [mockLog, mockLog];

const mockTask = {
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

const tasks = [mockTask, mockTask];

const mockReward = {
  id: "adfszxvc",
  emoji: "🥶",
  title: "Some Reward Title",
  collected: "no",
};

const questCopy = ref(null);

const rewards = [mockReward, mockReward];

watch(
  () => props.quest,
  (newQuest) => {
    questCopy.value = toRawDeep(newQuest);
  }
);
</script>

<style scoped></style>
