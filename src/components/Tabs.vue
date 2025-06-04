<template>
  <div class="tabs-container">
    <div class="tabs-header">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-button', { active: tab.key === selected }]"
        @click="selectTab(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs-content">
      <slot :selected="selected" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (val) => val.every((t) => typeof t.label === "string" && t.key),
  },
  selected: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:selected"]);

function selectTab(key) {
  emit("update:selected", key);
}
</script>

<style scoped>
.tabs-header {
  display: flex;
}

.tab-button {
  padding: 4px 8px;
  font-size: 12px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  border-bottom: 2px solid var(--color-surface);
  transition: 0.2s;

  &:hover {
    background-color: #d9d9d930;
  }
}

.tab-button.active {
  border-bottom-color: var(--color-muted);
  background-color: #d9d9d930;
}
</style>
