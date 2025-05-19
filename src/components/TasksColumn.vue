<template>
  <div class="column">
    <div class="header">
      <h2>Задачи</h2>
      <button @click="openModal(null)">+</button>
    </div>
    <draggable
      :list="tasks"
      group="tasks"
      item-key="id"
      :sort="false"
    >
      <template #item="{ element }">
        <TaskCard
          :task="element"
          removeTooltip="Удалить задачу"
          @toggle="toggle(element)"
          @increase="increase(element)"
          @decrease="decrease(element)"
          @edit="openModal(element)"
          @remove="removeTask(element)"
        />
      </template>
    </draggable>
    <TaskModal
      v-if="modalVisible"
      :task="selectedTask"
      :questId="questId"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import TaskCard from './TaskCard.vue'
import TaskModal from './TaskModal.vue'
import draggable from 'vuedraggable'

const store = useStore()
const questId = computed(() => store.getters['quests/selectedQuestId'])
const tasks = computed(() => store.getters['tasks/tasksByQuest'](questId.value))

const modalVisible = ref(false)
const selectedTask = ref(null)

function openModal(task) {
  selectedTask.value = task
  modalVisible.value = true
}

function closeModal() {
  modalVisible.value = false
  selectedTask.value = null
}

function toggle(task) {
  store.dispatch('tasks/updateTask', {
    id: task.id,
    done: !task.done
  })
}

function increase(task) {
  if (task.value < task.max) {
    store.dispatch('tasks/updateTask', {
      id: task.id,
      value: task.value + 1
    })
  }
}

function decrease(task) {
  if (task.value > 0) {
    store.dispatch('tasks/updateTask', {
      id: task.id,
      value: task.value - 1
    })
  }
}

function removeTask(task) {
  store.dispatch('tasks/deleteTask', task.id)
}
</script>

<style scoped>
.column {
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
</style>