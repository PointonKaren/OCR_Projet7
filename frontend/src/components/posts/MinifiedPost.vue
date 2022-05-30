<template>
  <!--Post minifié, utlisé pour la cascade de publications -->
  <router-link to="/post/:id" class="minified__post">
    <PostCard />
    <div class="minified__post__react">
      <p class="number__of__comments__per__post">42 commentaires</p>
      <p class="number__of__likes__per__post">
        42 <i class="fa-regular fa-heart"></i>
      </p>
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
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

.minified__post {
  background-color: $background;
  border: 2px solid $primaire;
  width: 35vw;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 20px;
  text-decoration: none;
  .minified__post__react {
    display: flex;
    width: 30vw;
    max-width: 800px;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 1200px) {
  .minified__post {
    width: 95vw;
    .minified__post__react {
      width: 90vw;
    }
  }
}
</style>
