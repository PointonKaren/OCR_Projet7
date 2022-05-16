<template>
  <div>
    <PostsCascade />
  </div>
</template>

<script>
import PostsCascade from "../components/posts/PostsCascade.vue";
export default {
  name: "ViewPosts",
  components: {
    PostsCascade,
  },
  data: function () {
    return {
      mode: "login",
    };
  },
  // methods: {
  // },
};
</script>

<style lang="scss">
// TODO : Permettre l'ajout d'un post
</style>
