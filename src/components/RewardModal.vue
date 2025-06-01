<template>
  <Modal
    :isOpen="isOpen"
    :secondModal="true"
    modalType="Награда"
    @close="emit('close')"
  >
    <EditableHeader
      @update="(newTitle) => (rewardCopy.title = newTitle)"
      :value="rewardCopy.title"
    />
    <p class="emoji">{{ rewardCopy.emoji }}</p>
    <emoji-picker
      class="emoji-picker dark"
      @emoji-click="onEmojiClick"
    ></emoji-picker>
    <div class="buttons">
      <button class="danger" @click="emit('delete', rewardCopy.id)">
        Удалить
      </button>
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
import "emoji-picker-element";

const props = defineProps({
  reward: Object,
  isOpen: Boolean,
});

const emit = defineEmits(["close", "save", "delete"]);
const store = useStore();

const rewardCopy = ref(null);

const onEmojiClick = (event) => {
  rewardCopy.value.emoji = event.detail.unicode;
};

const saveModal = () => {
  emit("save", toRawDeep(rewardCopy.value));
  emit("close");
};

watch(
  () => props.reward,
  (newTask) => {
    rewardCopy.value = toRawDeep(newTask);
  }
);
</script>

<style scoped>
.switch {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
}

.emoji-picker {
  align-self: center;
}

.emoji {
  align-self: center;
  text-align: center;
  font-size: 72px;
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
