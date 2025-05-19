<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <h2>Новая цель</h2>
      <input v-model="title" type="text" placeholder="Название цели" />
      <textarea
        v-model="description"
        placeholder="Краткое описание цели"
      ></textarea>
      <div class="buttons">
        <button @click="close" class="cancel">Отмена</button>
        <button @click="save" class="save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(["close"]);
const store = useStore();

const title = ref("");
const description = ref("");

const close = () => emit("close");

const save = async () => {
  if (!title.value.trim()) return;
  await store.dispatch("goals/createGoal", {
    title: title.value,
    description: description.value,
  });
  close();
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: var(--color-surface);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input,
textarea {
  background: #22252d;
  color: var(--color-text);
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
}
textarea {
  resize: vertical;
  min-height: 100px;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
button {
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.save {
  background-color: var(--color-accent-blue);
  color: white;
}
.cancel {
  background-color: transparent;
  color: var(--color-muted);
}
</style>
