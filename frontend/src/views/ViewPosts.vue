<template>
  <div>
    <BoxHeaderLogged />
    <PostsCascade />
  </div>
</template>

<script>
import BoxHeaderLogged from "../components/others/BoxHeaderLogged.vue";
import PostsCascade from "../components/posts/PostsCascade.vue";
export default {
  name: "ViewPosts",
  components: {
    BoxHeaderLogged,
    PostsCascade,
  },
};
</script>

<style lang="scss"></style>
