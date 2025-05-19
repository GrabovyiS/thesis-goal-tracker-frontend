<template>
  <div class="landing">
    <div class="content">
      <div class="emoji">🚀</div>
      <h1>Добро пожаловать в Goal Tracker</h1>
      <p>Декомпозируй цели и отслеживай прогерсс</p>
      <a href="/auth/google" class="cta-button">Войти через Google</a>
    </div>
  </div>
</template>

<style scoped>
.landing {
  background-color: #0c0d11;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  background-color: #333945;
  padding: 3rem;
  border-radius: 16px;
  max-width: 640px;
  width: 90%;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

.emoji {
  font-size: 48px;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: var(--color-muted);
}

.cta-button {
  display: inline-block;
  background-color: var(--color-accent-blue);
  color: var(--color-text);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
}

.cta-button:hover {
  background-color: #2484bb;
}
</style>
