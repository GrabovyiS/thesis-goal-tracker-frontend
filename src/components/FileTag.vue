<template>
  <button @click="downloadFile">
    <Paperclip :size="16" />
    <p>{{ file.name }}</p>
  </button>
</template>

<script setup>
import { useStore } from "vuex";
import { Paperclip } from "lucide-vue-next";

const props = defineProps(["file"]);
const store = useStore();

const downloadFile = () => {
  store.dispatch("tasks/getFile", file.id);
};
</script>

<style scoped>
button {
  align-self: center;
  color: var(--color-muted);
  border-radius: 4px;
  padding: 4px;
  padding-right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: var(--color-accent-grey);
  cursor: pointer;
  transition: background-color 0.25s;
  font-size: 10px;

  &:hover {
    background-color: #666b73;
  }
}
</style>
