<template>
  <button class="file-input" @click="triggerFileSelect">
    <Download size="16" />
  </button>
  <input
    type="file"
    ref="inputRef"
    :accept="accept"
    :multiple="multiple"
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
  multiple: Boolean,
});

const inputRef = ref();

const triggerFileSelect = () => {
  inputRef.value?.click();
};

const onFileChange = (e) => {
  const files = e.target.files;
  emit("update:files", files);
  emit("change", files);
};
</script>

<style scoped>
.file-input {
  color: var(--color-muted);
  padding: 4px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}
</style>
