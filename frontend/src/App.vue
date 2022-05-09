<template>
  <div id="app">
    <ProfileButton />
    <!-- <DetailPost /> -->
  </div>
</template>

<script>
import ProfileButton from "./components/ProfileButton.vue";
// import DetailPost from "./components/DetailPost.vue";
export default {
  name: "App",
  components: {
    ProfileButton,
    // DetailPost,
  },
};
</script>

<style lang="scss">
@import url("./style/reset.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");
#app {
  font-family: "Roboto", sans-serif;
}
.button {
  border: 1px solid red;
}
</style>
