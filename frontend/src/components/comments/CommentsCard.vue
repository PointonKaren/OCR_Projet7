<template>
  <!--Carte des commentaires-->
  <div class="comments__card">
    <div class="comments__header">
      <h2 class="comments__title">Commentaires</h2>
    </div>
    <div class="post__comments">
      <CommentCard v-for="(card, index) in 8" :key="index" />
    </div>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
export default {
  name: "CommentsCard",
  components: {
    CommentCard,
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

.comments__card {
  width: 30vw;
  .comments__header {
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    .comments__title {
      margin: auto;
      margin-top: 20px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .comments__card {
    width: 80vw;
  }
}
</style>
