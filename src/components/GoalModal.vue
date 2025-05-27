<template>
  <Modal :isOpen="isOpen" modalType="Цель" @close="emit('close')">
    <EditableHeader
      @update="(newTitle) => (goalCopy.title = newTitle)"
      v-model="goalCopy.title"
    />
    <input type="text" v-model="goalCopy.description" />
    <h3>История цели</h3>
    <div class="modal-list">
      <LogCard
        v-for="log in logs"
        :log="log"
        :quest="getQuestById(log.questId)"
      />
    </div>
    <h3>Связанные квесты</h3>
    <div class="modal-list">
      <QuestCard v-for="quest in quests" :quest="quest" />
    </div>
    <h3>Прогресс цели</h3>
    <div class="modal-list progress">
      <ProgressBar :percentage="11" />
    </div>
    <div class="buttons">
      <button class="danger" @click="emit('delete', goal.id)">
        Удалить цель
      </button>
      <button class="primary" @click="emit('save', goalCopy.value)">
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
import QuestCard from "./QuestCard.vue";
import ProgressBar from "./ProgressBar.vue";

const emit = defineEmits(["close", "delete", "save"]);
const store = useStore();

const props = defineProps(["goal", "isOpen"]);

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

const getQuestById = (id) => {
  // return quests.find((q) => q.id === id)
  return mockQuest;
};

const logs = [mockLog, mockLog];

// get a list of quests that have the same goalId as the current goal
const quests = [mockQuest, mockQuest];

const mockGoal = {
  id: "asdf",
  title: "Название цели",
  description:
    "Некоторое описание цели с более маленькими буквами которое даёт ненмого контекста",
  percentage: 90,
  completed: false,
};

const goalCopy = ref(mockGoal);

watch(
  () => props.goal,
  (newGoal) => {
    goalCopy.value = toRawDeep(newGoal);
  }
);

const close = () => emit("close");

const save = async () => {
  if (!title.value.trim()) return;

  await store.dispatch("goals/createGoal", {
    title: title.value,
    description: description.value,
  });

  close();
};
</script>

<style scoped></style>
