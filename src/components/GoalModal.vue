<template>
  <Modal :isOpen="isOpen" modalType="Цель" @close="emit('close')">
    <EditableHeader
      @update="(newTitle) => (goalCopy.title = newTitle)"
      :value="goalCopy.title"
    />
    <input type="text" v-model="goalCopy.description" />
    <h3>История цели</h3>
    <div class="modal-list">
      <template v-if="logs.length">
        <LogCard
          v-for="log in logs"
          :log="log"
          :quest="getQuestById(log.questId)"
        />
      </template>
      <template v-else>
        <p class="message">Пока тут ничего нет.</p>
        <p class="message">Ведите историю цели заполняя, заметки по квестам.</p>
      </template>
    </div>
    <h3>Связанные квесты</h3>
    <div class="modal-list">
      <template v-if="quests.length">
        <QuestCard v-for="quest in quests" :quest="quest" />
      </template>
      <template v-else>
        <p class="message">
          Разделите цель на более мелкие элементы, добавляя квесты.
        </p>
      </template>
    </div>
    <h3>Прогресс цели</h3>
    <div class="modal-list progress">
      <ProgressBar :percentage="0" />
    </div>
    <div class="buttons">
      <button class="danger" @click="emit('delete', goal.id)">Удалить</button>
      <button class="primary" @click="saveModal">Сохранить</button>
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

const logs = [];

// get a list of quests that have the same goalId as the current goal
const quests = [];

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

const saveModal = () => {
  emit("save", toRawDeep(goalCopy.value));
  emit("close");
};
</script>

<style scoped></style>
