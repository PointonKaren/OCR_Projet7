import { createWebHistory, createRouter } from "vue-router";
import ViewHome from "@/views/ViewHome.vue";
// import BoxSignup from "../components/others/BoxSignup.vue";
import ViewPosts from "../views/ViewPosts.vue";
import ViewPost from "../views/ViewPost.vue";

const routes = [
  {
    name: "ViewHome",
    path: "/",
    component: ViewHome,
    meta: {
      title: "Accueil",
    },
  },
  {
    name: "posts",
    path: "/post/",
    component: ViewPosts,
    meta: {
      title: "Accueil",
    },
  },
  {
    name: "post",
    path: "/post/:id",
    component: ViewPost,
    meta: {
      title: "Post",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
