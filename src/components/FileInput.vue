<template>
  <button class="file-input" @click="triggerFileSelect">
    <Download size="20" />
  </button>
  <input
    type="file"
    ref="inputRef"
    :accept="accept"
    multiple="true"
    hidden
    @change="onFileChange"
  />
</template>

<script setup>
import { Download } from "lucide-vue-next";
import { ref } from "vue";

const emit = defineEmits(["update:files", "change"]);

const props = defineProps({
  accept: String,
});

const inputRef = ref();

const triggerFileSelect = () => {
  inputRef.value?.click();
};

const onFileChange = (e) => {
  const files = Array.from(e.target.files);
  emit("update:files", files);
  emit("change", files);
};
</script>

<style scoped>
.file-input {
  cursor: pointer;
  color: var(--color-muted);
  padding: 4px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  font-size: 0;
  transition: background-color 0.25s;

  &:hover {
    background-color: #666b73;
  }
}
</style>
