<template>
  <Modal :isOpen="isOpen" modalType="Задача" @close="emit('close')">
    <EditableHeader
      @update="(newTitle) => (taskCopy.title = newTitle)"
      :value="taskCopy.title"
    />
    <input type="text" v-model="taskCopy.description" />
    <div class="files">
      <FileInput @change="handleFilesChange" />
      <FileTag
        v-for="file in taskCopy.files"
        :file="file"
        :downloadable="false"
        :deletable="true"
        @delete="handleFileDelete"
      />
    </div>
    <div class="switch">
      <Switch :value="taskCopy.type !== 'checkbox'" @change="toggleTaskType" />
      <p class="text">
        {{
          taskCopy.type === "checkbox"
            ? "Задача с галочкой"
            : "Задача с количеством выполнений"
        }}
      </p>
    </div>
    <Transition name="fade">
      <div class="input-group" v-if="taskCopy.type === 'progress'">
        <label for="quantity">Количество выполнений</label>
        <input id="quantity" type="number" v-model="taskCopy.max" />
      </div>
    </Transition>
    <div class="buttons">
      <button class="danger" @click="emit('delete', taskCopy.id)">
        Удалить
      </button>
      <button class="primary" @click="handleSave">Сохранить</button>
    </div>
  </Modal>
</template>

<script setup>
import { reactive, onMounted, watch, ref, computed } from "vue";
import { useStore } from "vuex";
import { toRawDeep } from "../utils/toRawDeep";
import EditableHeader from "./EditableHeader.vue";
import FileInput from "./FileInput.vue";
import FileTag from "./FileTag.vue";
import Modal from "./Modal.vue";
import Switch from "./Switch.vue";

const props = defineProps({
  task: Object,
  isOpen: Boolean,
});

const emit = defineEmits(["close", "save", "delete"]);
const store = useStore();

const taskCopy = ref(null);

watch(
  () => props.task,
  (newTask) => {
    taskCopy.value = toRawDeep(newTask);
  }
);

const toggleTaskType = () => {
  if (taskCopy.value.type === "checkbox") {
    taskCopy.value.type = "progress";
    taskCopy.value.done = false;
  } else {
    taskCopy.value.type = "checkbox";
    taskCopy.value.value = 0;
    taskCopy.value.max = 1;
  }
};

const handleFilesChange = (newFiles) => {
  taskCopy.value.files = newFiles;
};

const handleFileDelete = (file) => {
  taskCopy.value.files = taskCopy.value.files.filter((obj) => obj !== file);
};

const handleSave = () => {
  emit("save", {
    files: [...taskCopy.value.files],
    task: toRawDeep(taskCopy.value),
  });
  emit("close");
};
</script>

<style scoped>
.switch {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
}

.text {
  font-size: 12px;
  color: var(--color-muted);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.files {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
</style>
