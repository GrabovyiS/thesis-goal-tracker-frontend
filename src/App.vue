<template>
  <NavBar v-if="showNavbar" />
  <router-view />
  <vue-particles
    id="tsparticles"
    :options="particlesOptions"
    class="particles-bg"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const showNavbar = computed(() => route.path !== "/");

// RGB color stages: white → orange → blue → white
const colorStages = [
  [255, 255, 255], // white
  [255, 180, 82], // orange
  [46, 159, 220], // blue
];

const currentColor = ref([255, 255, 255]);
let stage = 0;
let t = 0;

function interpolateColor(c1, c2, t) {
  return c1.map((v, i) => Math.round(v + (c2[i] - v) * t));
}

onMounted(async () => {
  setInterval(() => {
    t += 0.05;
    if (t >= 1) {
      t = 0;
      stage = (stage + 1) % colorStages.length;
    }

    const nextStage = (stage + 1) % colorStages.length;
    currentColor.value = interpolateColor(
      colorStages[stage],
      colorStages[nextStage],
      t
    );
  }, 100);

  await store.dispatch("goals/fetchGoals");
  await store.dispatch("quests/fetchQuests");
  await store.dispatch("tasks/fetchTasks");
  await store.dispatch("rewards/fetchRewards");
  await store.dispatch("activeTasks/fetchActiveTasks");
  await store.dispatch("logs/fetchLogs");
  await store.dispatch("user/fetchUser");
});

const hexColor = computed(() => {
  const [r, g, b] = currentColor.value;
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
});

const particlesOptions = computed(() => ({
  background: {
    color: {
      value: "#0c0d11",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: hexColor.value,
    },
    links: {
      color: hexColor.value,
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      random: false,
      speed: 2.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
}));
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none !important;
}

.particles-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}

html,
body {
  font-family: "Inter", sans-serif;
  color: var(--color-text);
  min-height: 100vh;
  scroll-behavior: smooth;
}

/* CSS-переменные с цветами */
:root {
  --color-bg: #0c0d11;
  --color-bg-lighter: #252830;
  --color-text: #ffffff;
  --color-surface: #333945;
  --color-accent-blue: #2e9fdc;
  --color-accent-orange: #ffb452;
  --color-accent-danger: #fc4f52;
  --color-accent-grey: #4b505a;
  --color-hover-grey: #4b505a99;
  --color-muted: #d9d9d9;
  --color-border: #595e68;
  --color-border-focus: #9da0a6;
}

h1,
h2 {
  color: white;
  font-size: 28px;
  font-weight: bold;
}

h3 {
  color: white;
  font-size: 16px;
  font-weight: 600;
}

button {
  border: none;
  outline: none;
}

button.primary {
  background-color: var(--color-accent-blue);
  color: white;
  padding: 6px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0d90d6;
  }
}

button.danger {
  background-color: var(--color-accent-danger);
  color: white;
  padding: 6px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ca1b1e;
  }
}

emoji-picker {
  --background: var(--color-bg-lighter);
  --category-button-color: #aaa;
  --category-button-active-color: var(--color-muted);
  --category-button-hover-color: #d9d9d930;
  --search-input-background: var(--color-surface);
  --search-input-color: #fff;
  --emoji-size: 1.25rem;
  --font-family: "Inter", sans-serif;
  --border-radius: 8px;
  --border-color: var(--color-border);
  --input-border-radius: 4px;
  --input-font-color: var(--color-muted);
  --input-font-size: 12px;
  --input-padding: 4px;
  --category-font-color: var(--color-muted);
  --input-border-color: var(--color-border);
  --outline-size: 1px;
  --outline-color: var(--color-border-focus);
}

.icon-button {
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: background-color 0.25s;

  &:hover {
    background-color: #d9d9d930;
  }
}

.elevate {
  transition: transform 0.25s, box-shadow 0.25s;
}

.message {
  font-size: 14px;
  color: var(--color-muted);
  text-align: center;
}

.elevate:hover,
.elevate:active {
  transform: scale(1.01);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  max-height: 640px;
  overflow: auto;

  background-color: var(--color-bg-lighter);

  .header {
    display: flex;
    justify-content: space-between;

    h2 {
      font-weight: bold;
      font-size: 28px;
      color: white;
    }
  }
}

.draggable-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.column-header {
  margin-bottom: 12px;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  width: 100%;
  background-color: var(--color-surface);
  border-radius: 8px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  .card-text {
    font-size: 12px;
    color: var(--color-muted);
  }
}

.card-container.selected {
  padding: 14px;
  border: 2px solid var(--color-accent-blue);
  transform: scale(1.01);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
}

input {
  background-color: var(--color-surface);
  color: var(--color-muted);
  padding: 8px;
  font-size: 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  transition: all 0.25s;

  &::placeholder {
    color: #cecece;
  }

  &:focus {
    outline: none;
    border-color: var(--color-border-focus);
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 12px;
    color: var(--color-muted);
  }
}

.modal-list {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  padding: 16px;
  gap: 16px;

  border-radius: 16px;
  max-height: 360px;
  overflow: auto;

  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  min-height: 100px;

  &.empty {
    min-height: auto;
    overflow: initial;
  }

  &.progress {
    min-height: auto;
    overflow: visible;
  }

  .card-container {
    border: 1px solid var(--color-border);
  }

  .rewards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;

    .card-container {
      flex: 1;
    }
  }
}

.modal-container {
  background: var(--color-bg-lighter);
  padding: 16px;
  border-radius: 8px;
  width: 640px;
  max-height: calc(100vh - 40px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &.second-modal-container {
    width: 480px;
  }

  .buttons {
    display: flex;
    justify-content: end;
  }
}

.richtext-render {
  font-size: 12px;

  blockquote {
    border-left: 3px solid var(--color-muted);
    margin: 12px 0;
    padding-left: 8px;
    font-size: 14px;
    p {
      color: white;
    }
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  ul,
  ol {
    margin: 12px 0;
    padding: 0 16px;

    li p {
      margin-top: 2px;
      margin-bottom: 2px;
    }
  }

  code {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 10px;
    padding: 0.25em 0.3em;
  }

  p {
    margin: 12px 0;
    color: var(--color-muted);
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }
}
</style>
