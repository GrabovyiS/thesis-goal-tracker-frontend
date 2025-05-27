<template>
  <button></button>
</template>

<script setup>
const props = defineProps("update", "delete", "download");

const emit = defineEmits("update", "delete", "download");
</script>

<style scoped>
button {
  position: relative;
  cursor: pointer;
  background-color: transparent;
  padding: 4px;
}
</style>
