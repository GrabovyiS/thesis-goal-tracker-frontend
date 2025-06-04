import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import Dashboard from "../views/Dashboard.vue";
import Rewards from "../views/Rewards.vue";
import LogHistory from "../views/LogHistory.vue";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/dashboard", component: Dashboard },
  { path: "/rewards", component: Rewards },
  { path: "/logs-history", component: LogHistory },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
