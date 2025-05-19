<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <div class="header">
        <h2>{{ task ? "Редактировать задачу" : "Создать задачу" }}</h2>
        <button class="close" @click="close">×</button>
      </div>
      <form @submit.prevent="save">
        <label>Название</label>
        <input v-model="form.title" required />

        <label>Описание</label>
        <textarea v-model="form.description" rows="3" />

        <label>Тип задачи</label>
        <select v-model="form.type">
          <option value="checkbox">Обычная</option>
          <option value="progress">Количественная</option>
        </select>

        <div v-if="form.type === 'progress'">
          <label>Текущее значение</label>
          <input type="number" v-model.number="form.value" />
          <label>Максимум</label>
          <input type="number" v-model.number="form.max" />
        </div>

        <div class="actions">
          <button type="submit" class="primary">Сохранить</button>
          <button type="button" @click="close">Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  task: Object,
  questId: String,
});
const emit = defineEmits(["close"]);

const store = useStore();
const form = reactive({
  title: "",
  description: "",
  type: "checkbox",
  value: 0,
  max: 1,
});

onMounted(() => {
  if (props.task) {
    Object.assign(form, {
      title: props.task.title,
      description: props.task.description,
      type: props.task.type,
      value: props.task.value,
      max: props.task.max,
    });
  }
});

function close() {
  emit("close");
}

async function save() {
  if (props.task) {
    await store.dispatch("tasks/updateTask", {
      id: props.task.id,
      ...form,
    });
  } else {
    await store.dispatch("tasks/createTask", {
      questId: props.questId,
      ...form,
    });
  }

  close();
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal {
  position: relative; /* добавим это */
  background: var(--color-surface, #1f1f1f);
  border-radius: 8px;
  border: 1px solid #595e68;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.close {
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
input,
textarea,
select {
  width: 100%;
  margin-top: 4px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #2a2a2a;
  color: white;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
button {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
button.primary {
  background-color: var(--color-accent-blue, #2e9fdc);
  color: white;
}
button[type="button"] {
  background-color: #666;
  color: white;
}
</style>
