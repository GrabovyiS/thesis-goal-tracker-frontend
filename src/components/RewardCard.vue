<template>
  <div class="card-container elevate">
    <header>
      <ContextMenu
        v-if="showContext"
        :items="['update', 'delete']"
        @update="emit('update')"
        @delete="emit('delete')"
      />
      <p class="quest" v-if="showQuestName">{{ questName }}</p>
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

const props = defineProps({
  reward: Object,
  showContext: {
    type: Boolean,
    default() {
      return true;
    },
  },
  questName: String,
  showQuestName: Boolean,
});
const emit = defineEmits(["update", "delete"]);
</script>

<style scoped>
.card-container {
  width: auto;
  min-width: 160px;
  max-width: 220px;
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

.quest {
  font-size: 10px;
  color: var(--color-muted);
  text-align: right;
  width: 100%;
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
