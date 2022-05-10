<template>
  <!--Post minifié -->
  <div class="minified__post">
    <div class="minified__card">
      <PostCard />
    </div>
  </div>
</template>

<script>
import PostCard from "../posts/PostCard.vue";
export default {
  name: "MinifiedPost",
  components: {
    PostCard,
  },
};
</script>

<style lang="scss">
.minified__post {
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  width: 900px;
  padding-top: 10px;
  box-shadow: 3px 4px 20px #091f43;
  display: flex;
  flex-direction: row-reverse;
  margin: auto;
  margin-bottom: 20px;
  .minified__card {
    margin: auto;
  }
}
</style>
