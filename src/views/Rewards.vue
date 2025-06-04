<template>
  <div class="container">
    <div class="content">
      <div class="search">
        <h3>Поиск</h3>
        <input type="text" v-model="searchFilter" class="search" />
      </div>
      <div class="header">
        <h1>Список наград</h1>
        <Tabs :tabs="tabs" v-model:selected="selectedTab" />
      </div>
      <div class="rewards-container">
        <RewardCard
          v-for="reward in sortedRewards"
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
import { sortByCreatedAt } from "../utils/sort";
import { filterObjects } from "../utils/filter";

const store = useStore();

const rewards = computed(() => store.getters["rewards/allRewards"]);

const searchFilter = ref("");

const searchedRewards = computed(() =>
  filterObjects(rewards.value, "title", searchFilter.value)
);

const filteredRewards = computed(() =>
  searchedRewards.value.filter((r) => {
    if (selectedTab.value === "claimed") {
      return r.collected;
    } else {
      return true;
    }
  })
);

const sortedRewards = computed(() =>
  sortByCreatedAt(filteredRewards.value, true)
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
  width: 960px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rewards-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;
  background-color: var(--color-bg-lighter);
}
</style>
