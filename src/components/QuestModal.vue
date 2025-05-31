<template>
  <Modal :isOpen="isOpen" modalType="Квест" @close="emit('close')">
    <EditableHeader
      @update="(newTitle) => (questCopy.title = newTitle)"
      :value="questCopy.title"
    />
    <input type="text" v-model="questCopy.description" />
    <h3>Заметки по квесту</h3>
    <div class="modal-list">
      <template v-if="logs.length">
        <PlusButton @click="" />
        <LogCard
          v-for="log in logs"
          :log="log"
          :quest="questCopy"
          @delete="deleteLog"
        />
      </template>
      <template v-else>
        <p class="message">
          Ведите историю выполнения квеста, добавляя заметки.
        </p>
        <PlusButton @click="" />
      </template>
    </div>
    <h3>Связанные задачи</h3>
    <div class="modal-list">
      <template v-if="tasks.length">
        <TaskCard v-for="task in tasks" :task="task" />
      </template>
      <template v-else>
        <p class="message">
          Разделите квест на более мелкие элементы, добавляя задачи.
        </p>
      </template>
    </div>
    <h3>Прогресс квеста</h3>
    <div class="modal-list progress">
      <ProgressBar :percentage="0" />
    </div>
    <div class="buttons">
      <button class="danger" @click="emit('delete', quest.id)">
        Удалить квест
      </button>
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
import ProgressBar from "./ProgressBar.vue";
import TaskCard from "./TaskCard.vue";
import PlusButton from "./PlusButton.vue";

const emit = defineEmits(["close", "delete", "save"]);
const store = useStore();

const props = defineProps(["quest", "isOpen"]);

const logs = [];

const tasks = [];

const mockReward = {
  id: "adfszxvc",
  emoji: "🥶",
  title: "Some Reward Title",
  collected: "no",
};

const questCopy = ref(null);

const rewards = [mockReward, mockReward];

const saveModal = () => {
  emit("save", toRawDeep(questCopy.value));
  emit("close");
};

watch(
  () => props.quest,
  (newQuest) => {
    questCopy.value = toRawDeep(newQuest);
  }
);
</script>

<style scoped></style>
