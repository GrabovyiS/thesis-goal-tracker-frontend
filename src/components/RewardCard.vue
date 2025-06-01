<template>
  <div class="card-container elevate">
    <header>
      <ContextMenu
        :items="['update', 'delete']"
        @update="emit('update')"
        @delete="emit('delete')"
      />
    </header>
    <main class="reward-container">
      <p class="emoji">{{ reward.emoji }}</p>
      <p class="card-text">{{ reward.title }}</p>
      <Checkbox v-model="reward.collected" @click="emit('toggle')" />
    </main>
  </div>
</template>

<script setup>
import Checkbox from "./Checkbox.vue";
import ContextMenu from "./ContextMenu.vue";

const props = defineProps(["reward"]);
const emit = defineEmits(["update", "delete"]);
</script>

<style scoped>
.card-container {
  width: auto;
  min-width: 160px;
}

.reward-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

.card-text {
  text-align: center;
}

header {
  display: flex;
  justify-content: end;
  margin-bottom: -24px;
}

.emoji {
  font-size: 56px;
}
</style>
