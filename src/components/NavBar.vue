<template>
  <nav>
    <div class="links">
      <template v-if="user?.role === 'USER' || user?.role === 'SUBSCRIBER'">
        <router-link to="/dashboard">Главная</router-link>
      </template>
      <template v-if="user?.role === 'SUBSCRIBER'">
        <router-link to="/rewards">Награды</router-link>
        <router-link to="/logs-history">История заметок</router-link>
      </template>
      <template v-if="user?.role === 'ADMIN'">
        <router-link to="/admin-panel">Панель администратора</router-link>
      </template>
    </div>
    <Profile />
  </nav>
</template>

<script setup>
import { computed } from "vue";
import Profile from "./Profile.vue";
import { useStore } from "vuex";

const store = useStore();

const user = computed(() => store.getters["user/user"]);
</script>

<style scoped>
nav {
  padding: 0px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-surface);
}

.links {
  display: flex;

  a {
    text-decoration: none;
    padding: 12px 20px;
    color: var(--color-muted);
    font-size: 14px;
    transition: all 0.25s;

    &:hover {
      background-color: #d9d9d930;
    }
  }

  .router-link-active {
    font-weight: bold;
    background-color: #d9d9d915;
  }
}
</style>
