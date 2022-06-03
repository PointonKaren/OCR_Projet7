import { createWebHistory, createRouter } from "vue-router";
import ViewHome from "@/views/ViewHome.vue";
import ViewPosts from "../views/ViewPosts.vue";
import ViewPost from "../views/ViewPost.vue";

const routes = [
  {
    // Page principale, affiche signup/login
    name: "ViewHome",
    path: "/",
    component: ViewHome,
    meta: {
      title: "GroupoNetwork - Se connecter",
    },
  },
  {
    // Page d'accueil une fois l'utilisateur connecté (cascade de publications)
    name: "posts",
    path: "/post/",
    component: ViewPosts,
    meta: {
      title: "GroupoNetwork - Accueil",
    },
  },
  {
    // Détail d'une publication
    name: "post",
    path: "/post/:id",
    component: ViewPost,
    meta: {
      title: "GroupoNetwork - Détail de la publication",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((from) => {
  // Affiche le title en meta comme titre de l'onglet/de la page
  document.title = from.meta.title;
});
export default router;
