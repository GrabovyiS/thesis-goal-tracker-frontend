<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2>
        <input
          v-model="localQuest.title"
          placeholder="Название квеста"
          class="input title-input"
        />
      </h2>
      <textarea
        v-model="localQuest.description"
        placeholder="Описание квеста"
        class="input desc-input"
      />
      <div class="date">
        <label>Дедлайн:</label>
        <input type="date" v-model="localQuest.deadline" />
      </div>
      <div class="buttons">
        <button @click="onSave" class="save">Сохранить</button>
        <button @click="$emit('close')" class="cancel">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  quest: Object,
  goalId: String
})
const emit = defineEmits(['close'])

const store = useStore()

const localQuest = reactive({
  title: '',
  description: '',
  deadline: ''
})

watch(
  () => props.quest,
  (newVal) => {
    if (newVal) {
      Object.assign(localQuest, {
        title: newVal.title || '',
        description: newVal.description || '',
        deadline: newVal.deadline?.substring(0, 10) || ''
      })
    } else {
      Object.assign(localQuest, {
        title: '',
        description: '',
        deadline: ''
      })
    }
  },
  { immediate: true }
)

async function onSave() {
  if (props.quest?.id) {
    await store.dispatch('quests/updateQuest', {
      id: props.quest.id,
      title: localQuest.title,
      description: localQuest.description,
      deadline: localQuest.deadline || null
    })
  } else {
    await store.dispatch('quests/createQuest', {
      goalId: props.goalId,
      title: localQuest.title,
      description: localQuest.description,
      deadline: localQuest.deadline || null
    })
  }
  emit('close')
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background-color: var(--color-surface);
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  border: 1px solid #595E68;
}
.input {
  width: 100%;
  background-color: #2b2f38;
  border: 1px solid #595E68;
  border-radius: 4px;
  color: white;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 16px;
}
textarea {
  resize: vertical;
  min-height: 80px;
}
.date {
  color: white;
  font-size: 0.9rem;
  margin-bottom: 16px;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.save {
  background-color: var(--color-accent-blue);
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
.cancel {
  background: transparent;
  border: 1px solid #595E68;
  padding: 6px 12px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
</style>