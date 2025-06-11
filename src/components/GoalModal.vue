<template>
  <Modal :isOpen="isOpen" modalType="Цель" @close="emit('close')">
    <EditableHeader
      @update="(newTitle) => (goalCopy.title = newTitle)"
      :value="goalCopy.title"
    />
    <input type="text" v-model="goalCopy.description" />
    <h3>История цели</h3>
    <template v-if="logs.length">
      <div class="modal-list">
        <LogCard
          v-for="log in logs"
          :log="log"
          :quest="getQuestById(log.questId)"
          :showContext="false"
        />
      </div>
    </template>
    <template v-else>
      <div class="modal-list empty">
        <p class="message">Пока тут ничего нет.</p>
        <p class="message">Ведите историю цели заполняя, заметки по квестам.</p>
      </div>
    </template>

    <h3>Связанные квесты</h3>
    <div class="modal-list">
      <template v-if="quests.length">
        <QuestCard
          v-for="quest in sortedQuests"
          :quest="quest"
          :showContext="false"
        />
      </template>
      <template v-else>
        <p class="message">
          Разделите цель на более мелкие элементы, добавляя квесты.
        </p>
      </template>
    </div>
    <h3>Прогресс цели</h3>
    <div class="modal-list progress">
      <ProgressBar :percentage="progress" />
    </div>
    <h3>Награды</h3>
    <div class="modal-list">
      <template v-if="rewards.length">
        <div class="rewards">
          <RewardCard
            v-for="reward in sortedRewards"
            :reward="reward"
            @update="openRewardModal(reward)"
            @delete="deleteReward(reward.id)"
            @toggle="toggleReward(reward)"
            :showContext="false"
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
    <div class="buttons">
      <button class="primary" @click="saveModal">Сохранить</button>
    </div>
  </Modal>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Modal from "./Modal.vue";
import EditableHeader from "./EditableHeader.vue";
import { toRawDeep } from "../utils/toRawDeep";
import LogCard from "./LogCard.vue";
import QuestCard from "./QuestCard.vue";
import ProgressBar from "./ProgressBar.vue";
import RewardCard from "./RewardCard.vue";
import { getProgressFromTasks } from "../utils/progress";
import { sortByCreatedAt } from "../utils/sort";

const emit = defineEmits(["close", "delete", "save"]);
const store = useStore();

const props = defineProps(["goal", "isOpen"]);

const quests = computed(() =>
  store.getters["quests/questsByGoal"](props.goal.id)
);

const sortedQuests = computed(() => sortByCreatedAt(quests.value, true));

const tasks = computed(() =>
  quests.value.reduce((acc, currQuest) => {
    {
      const tasks = store.getters["tasks/tasksByQuest"](currQuest.id);
      acc.push(...tasks);
      return acc;
    }
  }, [])
);

const progress = computed(() => getProgressFromTasks(tasks.value));

const rewards = computed(() =>
  quests.value.reduce((acc, currQuest) => {
    const rewards = store.getters["rewards/rewardsByQuest"](currQuest.id);
    acc.push(...rewards);
    return acc;
  }, [])
);

const sortedRewards = computed(() => sortByCreatedAt(rewards.value, true));

const getQuestById = (id) => {
  return quests.value.find((q) => q.id === id);
};

const logs = computed(() =>
  quests.value.reduce((acc, currQuest) => {
    const logs = store.getters["logs/logsByQuest"](currQuest.id);
    acc.push(...logs);
    return acc;
  }, [])
);

const sortedLogs = computed(() => sortByCreatedAt(logs.value, true));

const goalCopy = ref(null);

watch(
  () => props.goal,
  (newGoal) => {
    goalCopy.value = toRawDeep(newGoal);
  }
);

const toggleReward = (reward) => {
  reward.collected = !reward.collected;
  if (reward.collected) {
    store.dispatch("notifications/notifyValuePlus");
  }
  store.dispatch("rewards/updateReward", toRawDeep(reward));
};

const saveModal = () => {
  emit("save", toRawDeep(goalCopy.value));
  emit("close");
};
</script>

<style scoped></style>
