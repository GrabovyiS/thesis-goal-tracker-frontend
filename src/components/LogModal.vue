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
    <RichTextEditor v-model="logCopy.description" />
    <div class="buttons">
      <button class="primary" @click="saveModal">Сохранить</button>
    </div>
  </Modal>
</template>

<script setup>
import { reactive, onMounted, watch, ref, computed } from "vue";
import { useStore } from "vuex";
import { toRawDeep } from "../utils/toRawDeep";
import EditableHeader from "./EditableHeader.vue";
import Modal from "./Modal.vue";
import RichTextEditor from "./RichTextEditor.vue";

const props = defineProps({
  log: Object,
  isOpen: Boolean,
});

const emit = defineEmits(["close", "save", "delete"]);
const store = useStore();

const logCopy = ref(null);

watch(
  () => props.log,
  (newLog) => {
    logCopy.value = toRawDeep(newLog);
  }
);

const saveModal = () => {
  emit("save", toRawDeep(logCopy.value));
  emit("close");
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
