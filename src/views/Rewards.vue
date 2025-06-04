<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h1>Список наград</h1>
        <Tabs :tabs="tabs" v-model:selected="selectedTab" />
      </div>
      <div class="rewards-container">
        <RewardCard
          v-for="reward in filteredRewards"
          :reward="reward"
          :showContext="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import RewardCard from "../components/RewardCard.vue";
import Tabs from "../components/Tabs.vue";

const store = useStore();

const rewards = computed(() => store.getters["rewards/allRewards"]);

const searchedRewards = computed(() => rewards.value);

const filteredRewards = computed(() =>
  searchedRewards.value.filter((r) => {
    if (selectedTab.value === "claimed") {
      return r.collected;
    } else {
      return true;
    }
  })
);

const tabs = [
  { key: "claimed", label: "Полученные" },
  { key: "all", label: "Все" },
];

const selectedTab = ref("claimed");
</script>

<style scoped>
.container {
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    width: 440px;

    h3 {
      text-align: center;
    }

    input {
      width: 100%;
    }
  }
}

.content {
  width: 640px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rewards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;
  background-color: var(--color-bg-lighter);
}
</style>
