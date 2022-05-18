import { createWebHistory, createRouter } from "vue-router";
import ViewHome from "@/views/ViewHome.vue";
import ViewPosts from "../views/ViewPosts.vue";
import ViewPost from "../views/ViewPost.vue";

const routes = [
  {
    name: "ViewHome",
    path: "/",
    component: ViewHome,
    meta: {
      title: "Se connecter",
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
      title: "Titre de l'image",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((from) => {
  document.title = from.meta.title;
});
export default router;
