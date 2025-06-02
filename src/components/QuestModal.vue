<template>
  <Modal :isOpen="isOpen" modalType="Квест" @close="emit('close')">
    <EditableHeader
      @update="(newTitle) => (questCopy.title = newTitle)"
      :value="questCopy.title"
    />
    <input type="text" v-model="questCopy.description" />
    <h3>Заметки по квесту</h3>
    <div class="modal-list">
      <template v-if="logs.length">
        <PlusButton @click="createLog" />
        <LogCard
          v-for="log in logs"
          :log="log"
          :quest="questCopy"
          @update="openLogModal(log)"
          @delete="deleteLog(log.id)"
        />
      </template>
      <template v-else>
        <p class="message">
          Ведите историю выполнения квеста, добавляя заметки.
        </p>
        <PlusButton @click="createLog" />
      </template>
    </div>
    <h3>Связанные задачи</h3>
    <div class="modal-list">
      <template v-if="tasks.length">
        <TaskCard v-for="task in tasks" :task="task" />
      </template>
      <template v-else>
        <p class="message">
          Разделите квест на более мелкие элементы, добавляя задачи.
        </p>
      </template>
    </div>
    <h3>Награды</h3>
    <div class="modal-list">
      <template v-if="rewards.length">
        <PlusButton @click="createReward" />
        <div class="rewards">
          <RewardCard
            v-for="reward in rewards"
            :reward="reward"
            @update="openRewardModal(reward)"
            @delete="deleteReward(reward.id)"
            @toggle="toggleReward(reward)"
          />
        </div>
      </template>
      <template v-else>
        <p class="message">
          Добавьте награды, показывающие ожидаемый результат выполнения квеста.
        </p>
        <PlusButton @click="createReward" />
      </template>
    </div>
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

const emit = defineEmits(["close", "delete", "save"]);
const store = useStore();

const props = defineProps(["quest", "isOpen"]);

const logs = computed(() => store.getters["logs/logsByQuest"](props.quest.id));

const tasks = computed(() =>
  store.getters["tasks/tasksByQuest"](props.quest.id)
);

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
  store.dispatch("rewards/updateReward", toRawDeep(reward));
};

const deleteReward = (id) => {
  store.dispatch("rewards/deleteReward", id);
};

const questCopy = ref(null);

const rewards = computed(() =>
  store.getters["rewards/rewardsByQuest"](props.quest.id)
);

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
</script>

<style scoped></style>
