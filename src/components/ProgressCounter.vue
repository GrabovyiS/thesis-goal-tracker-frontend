<template>
  <div class="box">
    <Minus class="button" size="18" @click="emit('minus')" />
    <p>{{ value }}/{{ max }}</p>
    <Plus class="button" size="18" @click="emit('plus')" />
  </div>
</template>

<script setup>
import { Minus } from "lucide-vue-next";
import { Plus } from "lucide-vue-next";

const props = defineProps(["value", "max"]);

const emit = defineEmits(["minus", "plus"]);
</script>

<style scoped>
.box {
  display: flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--color-muted);
  color: var(--color-muted);
  border-radius: 4px;
  align-self: flex-start;

  p {
    font-size: 14px;
    text-wrap: nowrap;
  }

  .button {
    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.25s;
    &:hover {
      background-color: #d9d9d930;
    }
  }
}
</style>
