<template>
  <div>
    <DetailPost />
  </div>
</template>

<script>
import DetailPost from "../components/posts/DetailPost.vue";
export default {
  name: "ViewPost",
  components: {
    DetailPost,
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
