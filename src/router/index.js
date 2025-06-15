import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import Dashboard from "../views/Dashboard.vue";
import Rewards from "../views/Rewards.vue";
import LogHistory from "../views/LogHistory.vue";
import AdminPage from "../views/AdminPage.vue"; // add your admin view

const routes = [
  { path: "/", component: LoginPage },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { roles: ["USER", "SUBSCRIBER"] },
  },
  {
    path: "/rewards",
    component: Rewards,
    meta: { roles: ["SUBSCRIBER"] },
  },
  {
    path: "/logs-history",
    component: LogHistory,
    meta: { roles: ["SUBSCRIBER"] },
  },
  {
    path: "/admin-panel",
    component: AdminPage,
    meta: { roles: ["ADMIN"] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
