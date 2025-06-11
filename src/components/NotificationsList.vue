<!-- src/components/NotificationsList.vue -->
<template>
  <div class="notifications-list">
    <transition-group name="slide-fade" tag="div">
      <NotificationCard
        v-for="notif in notifications"
        :key="notif.id"
        :notification="notif"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import NotificationCard from "./NotificationCard.vue";

const store = useStore();

const notifications = computed(
  () => store.getters["notifications/allNotifications"]
);

function onRemove(id) {
  store.commit("notifications/removeNotification", id);
}
</script>

<style scoped>
.notifications-list {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

/* reuse slide-fade from your NotificationCard.vue */
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
</style>
