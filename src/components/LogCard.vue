<template>
  <div class="card-container">
    <header>
      <p class="card-text left">{{ formatDateToLong() }}</p>
      <p class="card-text quest" @click="emit('quest-click')">
        {{ quest.title }}
      </p>
      <ContextMenu
        :items="['update', 'delete']"
        @update="emit('update')"
        @delete="emit('delete')"
      />
    </header>
    <h3>{{ log.title }}</h3>
    <p class="card-text">{{ log.description }}</p>
    <div class="file-tags">
      <FileTag v-for="file in log.files" :file="file" />
    </div>
  </div>
</template>

<script setup>
import ContextMenu from "./ContextMenu.vue";
import { formatDateToLong } from "../utils/dates";
import FileTag from "./FileTag.vue";

const props = defineProps(["log", "quest"]);
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

p.quest {
  text-decoration: underline;
}

.file-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
