<template>
  <div>
    <div class="column-header">
      <h2>Задачи</h2>
      <Tabs :tabs="tabs" v-model:selected="selectedTab" />
    </div>
    <div class="column-container">
      <PlusButton @click="createTask" />
      <draggable
        :list="sortedTasks"
        :group="{ name: 'tasks', pull: 'clone', put: 'false' }"
        item-key="id"
        :sort="false"
        class="draggable-container"
        :animation="250"
        ghost-class="ghost"
        chosen-class="chosen"
        drag-class="drag"
        :clone="cloneTask"
        v-if="searchedTasks.length"
      >
        <template #item="{ element }">
          <TaskCard
            :task="element"
            @toggle="toggle(element)"
            @increase="increase(element)"
            @decrease="decrease(element)"
            @update="openModal(element)"
            @delete="deleteTask(element)"
            @complete="completeTask(element)"
          />
        </template>
      </draggable>
    </div>
  </div>
  <TaskModal
    :isOpen="modalVisible"
    :task="modalTask"
    @save="updateTask"
    @close="closeModal"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import TaskCard from "./TaskCard.vue";
import TaskModal from "./TaskModal.vue";
import draggable from "vuedraggable";
import PlusButton from "./PlusButton.vue";
import { toRawDeep } from "../utils/toRawDeep";
import { filterObjects } from "../utils/filter";
import Tabs from "./Tabs.vue";
import { tabs } from "../utils/tabs";
import { filterByTabs } from "../utils/tabs";
import { sortByCreatedAt } from "../utils/sort";

const cloneTask = (t) => ({ ...t });

const props = defineProps(["searchFilter"]);

const store = useStore();
const questId = computed(() => store.getters["quests/selectedQuestId"]);
const tasks = computed(() =>
  store.getters["tasks/tasksByQuest"](questId.value)
);

const searchedTasks = computed(() => {
  const list = filterObjects(tasks.value, "title", props.searchFilter);
  return list;
});

const selectedTab = ref("ongoing");

const filteredTasks = computed(() =>
  filterByTabs(tasks.value, selectedTab.value)
);

const sortedTasks = computed(() => sortByCreatedAt(filteredTasks.value, true));

const modalVisible = ref(false);
const modalTask = ref(null);

function openModal(task) {
  modalTask.value = task;
  modalVisible.value = true;
}

const closeModal = () => {
  modalVisible.value = false;
};

const toggle = (task) => {
  task.done = !task.done;
  store.dispatch("tasks/updateTask", toRawDeep(task));

  if (task.done) {
    store.dispatch("notifications/notifyValuePlus");
  } else {
    store.dispatch("notifications/notifyValueMinus");
  }
};

const increase = (task) => {
  if (task.value < task.max) {
    task.value++;
    store.dispatch("tasks/updateTask", task);
  }
};

const decrease = (task) => {
  if (task.value > 0) {
    task.value--;
    store.dispatch("tasks/updateTask", task);
  }
};

const createTask = () => {
  store.dispatch("tasks/createTask", questId.value);
};

const updateTask = ({ task, files }) => {
  task.files = files;
  store.dispatch("tasks/updateTask", task);
};

const completeTask = (task) => {
  store.dispatch("tasks/completeTask", task);
};

const deleteTask = (task) => {
  store.dispatch("tasks/deleteTask", task.id);
};
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
