import { createWebHistory, createRouter } from "vue-router";
import BoxSignup from "../components/others/BoxSignup.vue";

const routes = [
  {
    name: "signup",
    path: "/user/signup",
    component: BoxSignup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
