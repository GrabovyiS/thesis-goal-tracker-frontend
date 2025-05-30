<template>
  <div
    class="editable-header"
    :style="isEditing ? { padding: '0px' } : { padding: '4px' }"
  >
    <template v-if="isEditing">
      <input
        ref="inputRef"
        v-model="draft"
        @keyup.enter="save"
        @keyup.escape="cancel"
        class="editable-input"
      />
      <button class="icon-button" @click="cancel">
        <X size="20" />
      </button>
    </template>
    <template v-else>
      <h2>{{ value }}</h2>
      <button class="icon-button" @click="startEditing">
        <SquarePen size="20" />
      </button>
    </template>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, nextTick } from "vue";
import { SquarePen, X } from "lucide-vue-next";

const props = defineProps({
  value: String,
});
const emit = defineEmits(["update", "cancel"]);

const isEditing = ref(false);
const draft = ref("");
const inputRef = ref(null);

function startEditing() {
  draft.value = props.value;
  isEditing.value = true;

  nextTick(() => {
    inputRef.value?.focus();
  });
}

function save() {
  if (draft.value !== props.value) {
    emit("update", draft.value);
  }
  isEditing.value = false;
}

function cancel() {
  isEditing.value = false;
}
</script>

<style scoped>
.editable-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: -4px;
  margin-bottom: -4px;
}

.editable-input {
  font-size: 28px;
  font-weight: bold;
  padding: 4px;
  border-radius: 4px;
  color: white;
}

.icon-button {
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: background-color 0.25s;

  &:hover {
    background-color: #d9d9d930;
  }
}
</style>
