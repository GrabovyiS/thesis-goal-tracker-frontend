<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: "Inter", sans-serif;
  background-color: var(--color-bg);
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
  --color-muted: #d9d9d9;
}
</style>
