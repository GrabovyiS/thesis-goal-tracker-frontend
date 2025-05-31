<template>
  <button class="elevate" :style="{ width: wide ? '100%' : 'auto' }">
    <Plus @click="$emit('click')" size="24" />
  </button>
</template>

<script setup>
import { Plus } from "lucide-vue-next";
const props = defineProps(["wide"]);
</script>

<style scoped>
.modal-list button {
  border: 1px solid var(--color-border);
}

button {
  cursor: pointer;
  color: var(--color-muted);
  border-radius: 8px;
  background-color: var(--color-surface);
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
}
</style>
