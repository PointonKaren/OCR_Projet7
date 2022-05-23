<template>
  <!--Post minifié, utlisé pour la cascade de publications -->
  <router-link to="/post/:id" class="minified__post">
    <PostCard />
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
  width: 35vw;
  max-width: 900px;
  padding-top: 10px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin: auto;
  margin-bottom: 20px;
  text-decoration: none;
}
@media screen and (max-width: 1200px) {
  .minified__post {
    width: 95vw;
  }
}
</style>
