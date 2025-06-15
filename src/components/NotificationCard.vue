<template>
  <div
    class="notification-card"
    :class="`notification--${notification.type}`"
    role="alert"
  >
    <div class="notification-content">
      <h4 v-if="notification.title">{{ notification.title }}</h4>
      <p v-if="notification.message">{{ notification.message }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  notification: { type: Object, required: true },
});
</script>

<style scoped>
.notification-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-bg-lighter);
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
}

.notification-content {
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    font-size: 14px;
    font-weight: normal;
    color: var(--color-muted);
  }
}

h4 {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.notification--success {
  border-left: 8px solid var(--color-accent-blue);
}

.notification--error {
  border-left: 8px solid var(--color-accent-danger);
}
</style>
