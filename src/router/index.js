import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/dashboard", component: Dashboard },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
