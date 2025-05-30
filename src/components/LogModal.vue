<template>
  <Modal
    :isOpen="isOpen"
    :secondModal="true"
    modalType="Заметка"
    @close="emit('close')"
  >
    <EditableHeader
      @update="(newTitle) => (logCopy.title = newTitle)"
      :value="logCopy.title"
    />
    <!-- status -->
    <div class="buttons">
      <button class="danger" @click="emit('delete', logCopy.id)">
        Удалить
      </button>
      <button class="primary" @click="emit('save', logCopy.value)">
        Сохранить
      </button>
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

const logCopy = ref(null);

watch(
  () => props.task,
  (newTask) => {
    logCopy.value = toRawDeep(newTask);
  }
);

const handleFilesChange = (newFiles) => {
  logCopy.value.files = newFiles;
};

const handleFileDelete = (file) => {
  logCopy.value.files = logCopy.value.files.filter((obj) => obj !== file);
};
</script>

<style scoped>
.text {
  font-size: 12px;
  color: var(--color-muted);
}

.files {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
</style>
