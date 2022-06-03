<template>
  <div>
    <HeaderLogged />
    <PostsCascade />
  </div>
</template>

<script>
import HeaderLogged from "../components/others/HeaderLogged.vue";
import PostsCascade from "../components/posts/PostsCascade.vue";
export default {
  name: "ViewPosts",
  components: {
    HeaderLogged,
    PostsCascade,
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";
</style>
