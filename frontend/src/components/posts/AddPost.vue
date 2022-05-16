<template>
  <!--Post minifié -->
  <router-link to="/post/:id">
    <div class="minified__post">
      <div class="minified__card">
        <PostCard />
      </div>
    </div>
  </router-link>
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
  display: flex;
  flex-direction: row-reverse;
  margin: auto;
  margin-bottom: 20px;
  .minified__card {
    margin: auto;
  }
}
</style>
