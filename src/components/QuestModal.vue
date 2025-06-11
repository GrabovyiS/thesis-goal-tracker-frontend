<template>
  <Modal :isOpen="isOpen" modalType="Квест" @close="emit('close')">
    <EditableHeader
      @update="(newTitle) => (questCopy.title = newTitle)"
      :value="questCopy.title"
    />
    <input type="text" v-model="questCopy.description" />
    <p class="card-text">Выполнить до</p>
    <VueDatePicker
      v-model="deadlineComputed"
      :dark="true"
      :enable-time-picker="false"
      :format="'dd.MM.yyyy'"
      :teleport="true"
    ></VueDatePicker>

    <h3>Заметки по квесту</h3>
    <template v-if="logs.length">
      <div class="modal-list">
        <PlusButton @click="createLog" />
        <LogCard
          v-for="log in sortedLogs"
          :log="log"
          :quest="questCopy"
          @update="openLogModal(log)"
          @delete="deleteLog(log.id)"
        />
      </div>
    </template>
    <template v-else>
      <div class="modal-list empty">
        <p class="message">
          Ведите историю выполнения квеста, добавляя заметки.
        </p>
        <PlusButton @click="createLog" />
      </div>
    </template>
    <h3>Связанные задачи</h3>
    <template v-if="tasks.length">
      <div class="modal-list">
        <TaskCard
          v-for="task in sortedTasks"
          :task="task"
          :showContext="false"
          @toggle="toggle(task)"
          @increase="increase(task)"
          @decrease="decrease(task)"
          @complete="completeTask(task)"
        />
      </div>
    </template>
    <template v-else>
      <div class="modal-list empty">
        <p class="message">
          Разделите квест на более мелкие элементы, добавляя задачи.
        </p>
      </div>
    </template>
    <h3>Награды</h3>
    <template v-if="rewards.length">
      <div class="modal-list">
        <PlusButton @click="createReward" />
        <div class="rewards">
          <RewardCard
            v-for="reward in sortedRewards"
            :reward="reward"
            @update="openRewardModal(reward)"
            @delete="deleteReward(reward.id)"
            @toggle="toggleReward(reward)"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="modal-list empty">
        <p class="message">
          Добавьте награды, показывающие ожидаемый результат выполнения квеста.
        </p>
        <PlusButton @click="createReward" />
      </div>
    </template>
    <h3>Прогресс квеста</h3>
    <div class="modal-list progress">
      <ProgressBar :percentage="progress" />
    </div>
    <div class="buttons">
      <button class="primary" @click="saveModal">Сохранить</button>
    </div>
    <RewardModal
      :reward="modalReward"
      :isOpen="rewardModalOpen"
      @save="updateReward"
      @close="rewardModalOpen = false"
    />
    <LogModal
      :log="modalLog"
      :isOpen="logModalOpen"
      @save="updateLog"
      @close="logModalOpen = false"
    />
  </Modal>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Modal from "./Modal.vue";
import EditableHeader from "./EditableHeader.vue";
import { toRawDeep } from "../utils/toRawDeep";
import LogCard from "./LogCard.vue";
import ProgressBar from "./ProgressBar.vue";
import TaskCard from "./TaskCard.vue";
import PlusButton from "./PlusButton.vue";
import RewardCard from "./RewardCard.vue";
import RewardModal from "./RewardModal.vue";
import { getProgressFromTasks } from "../utils/progress";
import LogModal from "./LogModal.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { sortByCreatedAt } from "../utils/sort";

const emit = defineEmits(["close", "delete", "save"]);
const store = useStore();

const props = defineProps(["quest", "isOpen"]);

const logs = computed(() => store.getters["logs/logsByQuest"](props.quest.id));

const sortedLogs = computed(() => sortByCreatedAt(logs.value, true));

const tasks = computed(() =>
  store.getters["tasks/tasksByQuest"](props.quest.id)
);

const sortedTasks = computed(() => sortByCreatedAt(tasks.value, true));

const rewardModalOpen = ref(false);
const modalReward = ref(null);

const openRewardModal = (reward) => {
  modalReward.value = reward;
  rewardModalOpen.value = true;
};

const createReward = () => {
  store.dispatch("rewards/createReward", props.quest.id);
};

const updateReward = (newReward) => {
  store.dispatch("rewards/updateReward", newReward);
};

const toggleReward = (reward) => {
  reward.collected = !reward.collected;
  if (reward.collected) {
    store.dispatch("notifications/notifyValuePlus");
  } else {
    store.dispatch("notifications/notifyValueMinus");
  }

  store.dispatch("rewards/updateReward", toRawDeep(reward));
};

const deleteReward = (id) => {
  store.dispatch("rewards/deleteReward", id);
};

const questCopy = ref(null);

const rewards = computed(() =>
  store.getters["rewards/rewardsByQuest"](props.quest.id)
);

const sortedRewards = computed(() => sortByCreatedAt(rewards.value, true));

const progress = computed(() => getProgressFromTasks(tasks.value));

const saveModal = () => {
  emit("save", toRawDeep(questCopy.value));
  emit("close");
};

const logModalOpen = ref(false);
const modalLog = ref(null);

const openLogModal = (log) => {
  logModalOpen.value = true;
  modalLog.value = log;
};

const createLog = () => {
  store.dispatch("logs/createLog", props.quest.id);
};

const updateLog = (newLog) => {
  store.dispatch("logs/updateLog", newLog);
};

const deleteLog = (id) => {
  store.dispatch("logs/deleteLog", id);
};

watch(
  () => props.quest,
  (newQuest) => {
    questCopy.value = toRawDeep(newQuest);
  }
);

const deadlineComputed = computed({
  get() {
    const raw = questCopy.value?.deadline;
    const date = raw ? new Date(raw) : null;
    return date;
  },
  set(date) {
    questCopy.value.deadline = date ? date.toISOString().split("T")[0] : null;
  },
});

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

const completeTask = (task) => {
  store.dispatch("tasks/completeTask", task);
};
</script>

<style>
.dp__theme_dark {
  --dp-background-color: var(--color-surface);
  --dp-text-color: var(--color-muted);
  --dp-icon-color: var(--color-muted);
  --dp-hover-color: var(--color-surface);
  --dp-border-color-hover: var(--color-border);
  --dp-menu-border-color: var(--color-border);
  --dp-border-color-focus: var(--color-border-focus);
  --dp-border-color: var(--color-border);
  --dp-primary-color: var(--color-accent-blue);
  --dp-success-color: var(--color-accent-blue);
  --dp-input-padding: 8px;
  --dp-input-icon-padding: 32px;
  --dp-font-family: inherit;
  --dp-font-size: 12px;
}

.dp__input_icons {
  padding: 0px 12px;
}
</style>
