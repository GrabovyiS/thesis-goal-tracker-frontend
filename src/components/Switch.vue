<template>
  <div class="switch" :class="{ 'switch-on': value }" @click="toggle">
    <div class="switch-thumb" />
  </div>
</template>

<script setup>
const props = defineProps({
  value: { type: Boolean, required: true },
});
const emit = defineEmits(["change"]);

function toggle() {
  emit("change");
}
</script>

<style scoped>
.switch {
  width: 48px;
  height: 28px;
  border-radius: 4px;
  background-color: var(--color--surface);
  border: 1px solid var(--color-border);
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}
.switch-thumb {
  width: 22px;
  height: 22px;
  background: var(--color-muted);
  border-radius: 2px;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}
.switch-on .switch-thumb {
  transform: translateX(20px);
}
</style>
