<template></template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const logs = computed(() => store.getters["logs/allLogs"]);
</script>

<style scoped>
.container {
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    width: 440px;

    h3 {
      text-align: center;
    }

    input {
      width: 100%;
    }
  }
}

.content {
  width: 640px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rewards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;
  background-color: var(--color-bg-lighter);
}
</style>
