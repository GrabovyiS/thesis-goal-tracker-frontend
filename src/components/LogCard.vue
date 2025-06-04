<template>
  <div class="card-container elevate">
    <header>
      <p class="card-text left">{{ formatDateToLong(log.createdAt) }}</p>
      <p class="card-text quest" @click="emit('quest-click')">
        {{ quest.title }}
      </p>
      <ContextMenu
        v-if="showContext"
        :items="['update', 'delete']"
        @update="emit('update')"
        @delete="emit('delete')"
      />
    </header>
    <h3>{{ log.title }}</h3>
    <p class="richtext-render" v-html="log.description"></p>
  </div>
</template>

<script setup>
import ContextMenu from "./ContextMenu.vue";
import { formatDateToLong } from "../utils/dates";
import FileTag from "./FileTag.vue";

const props = defineProps({
  log: Object,
  quest: Object,
  showContext: {
    type: Boolean,
    default() {
      return true;
    },
  },
});
const emit = defineEmits(["quest-click", "update", "delete"]);
</script>

<style scoped>
header {
  display: flex;
  gap: 4px;
}

p.left {
  margin-right: auto;
}
</style>
