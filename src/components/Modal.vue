<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal-backdrop" @click.self="close">
      <div class="modal-container">
        <header>
          <p class="type">{{ modalType }}</p>
          <button class="close-button" @click="close">
            <X size="24" />
          </button>
        </header>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  modalType: String,
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  color: var(--color-muted);

  .type {
    font-size: 12px;
  }

  .close-button {
    color: var(--color-muted);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    transition: background-color 0.25s;
    border: none;
    padding: 2px;
    border-radius: 4px;

    &:hover {
      background-color: #d9d9d930;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
