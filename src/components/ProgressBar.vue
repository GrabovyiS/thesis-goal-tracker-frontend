<template>
  <div class="container">
    <p class="percents" :class="percentage === 100 ? 'complete' : ''">
      {{ percentage }}%
    </p>
    <div class="bar-container">
      <div class="bar background-bar"></div>
      <div
        class="bar progress-bar"
        :class="percentage === 100 ? 'complete' : ''"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["percentage"]);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;

  .percents {
    font-size: 12px;
    color: var(--color-accent-orange);

    &.complete {
      color: var(--color-accent-blue);
    }
  }
}

.bar-container {
  position: relative;
  width: 100%;
  height: 16px;

  .bar {
    border-radius: 16px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  .background-bar {
    width: 100%;
    background-color: var(--color-bg-lighter);
  }

  .progress-bar {
    transition: width 0.35s ease;
    border-radius: 16px;
    background-color: var(--color-accent-orange);

    &.complete {
      background-color: var(--color-accent-blue);
    }
  }
}
</style>
