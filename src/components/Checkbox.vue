<template>
  <input type="checkbox" hidden :checked="modelValue" @change="toggle" />
  <div class="box" @click="toggle">
    <Check size="16" v-if="modelValue" />
  </div>
</template>

<script setup>
import { Check } from "lucide-vue-next";
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

function toggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<style scoped>
.box {
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-muted);
  border-radius: 4px;
  color: var(--color-muted);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: #d9d9d930;
  }
}
</style>
