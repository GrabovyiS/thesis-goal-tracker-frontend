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
  --color-accent-danger: #fc4f52;
  --color-accent-grey: #4b505a;
  --color-hover-grey: #4b505a99;
  --color-muted: #d9d9d9;
  --color-border: #595e68;
  --color-border-focus: #9da0a6;
}

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

.column-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
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
  overflow: auto;
  border-radius: 16px;

  &.progress {
    overflow: visible;
  }

  .card-container {
    border: 1px solid var(--color-border);
  }
}

.modal-container {
  background: var(--color-bg-lighter);
  padding: 16px;
  border-radius: 8px;
  width: 640px;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  gap: 16px;

  &.second-modal-container {
    width: 480px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
