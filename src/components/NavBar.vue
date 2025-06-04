<template>
  <nav>
    <div class="links">
      <router-link to="/dashboard">Главная</router-link>
      <router-link to="/rewards">Награды</router-link>
      <router-link to="/logs-history">История заметок</router-link>
    </div>
    <Profile />
  </nav>
</template>

<script setup>
import Profile from "./Profile.vue";
</script>

<style scoped>
nav {
  padding: 0px 48px;
  display: flex;
  justify-content: space-between;
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
