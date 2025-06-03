import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { loadFull } from "tsparticles";
import Particles from "@tsparticles/vue3";

const app = createApp(App);

app.use(router).use(store);

// Register the Particles plugin properly
app.use(Particles, {
  init: async (engine) => {
    await loadFull(engine); // load all features
  },
});

app.mount("#app");
