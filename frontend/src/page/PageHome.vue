<template>
  <div class="home">
    <BoxHeader />
    <!-- <BoxPresentation />
    <BoxSignup />
    <BoxLogin />
    <DetailPost /> -->
    <PostsCascade />
  </div>
</template>

<script>
import BoxHeader from "../components/others/BoxHeader.vue";
// import BoxPresentation from "../components/others/BoxPresentation.vue";
// import BoxSignup from "../components/others/BoxSignup.vue";
// import BoxLogin from "../components/others/BoxLogin.vue";
// import DetailPost from "../components/posts/DetailPost.vue";
import PostsCascade from "../components/posts/PostsCascade.vue";
export default {
  name: "PageHome",
  components: {
    BoxHeader,
    // BoxPresentation,
    // BoxSignup,
    // BoxLogin,
    // DetailPost,
    PostsCascade,
  },
};
</script>

<style></style>
