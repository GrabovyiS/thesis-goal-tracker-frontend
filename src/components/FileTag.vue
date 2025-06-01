<template>
  <button
    class="tag"
    :class="downloadable ? 'clickable' : ''"
    @click="downloadFile"
  >
    <Paperclip :size="16" />
    <p>{{ file.name }}</p>
    <button v-if="deletable" class="icon-button" @click="emit('delete', file)">
      <X size="16" />
    </button>
  </button>
</template>

<script setup>
import { useStore } from "vuex";
import { Paperclip, X } from "lucide-vue-next";

const props = defineProps(["file", "downloadable", "deletable"]);
const emit = defineEmits(["delete"]);
const store = useStore();

const downloadFile = () => {
  if (!props.downloadable) {
    return;
  }

  if (!props.file.id) {
    return;
  }

  store.dispatch("tasks/getFile", props.file.id);
};
</script>

<style scoped>
.tag {
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
  transition: background-color 0.25s;
  font-size: 10px;

  &.clickable:hover {
    cursor: pointer;
    background-color: #666b73;
  }
}
</style>
