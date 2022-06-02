<template>
  <!--Carte des commentaires-->
  <div class="comments__card">
    <div class="comments__header">
      <h2 class="comments__title">Commentaires</h2>
    </div>
    <div class="post__comments">
      <CommentCard
        v-for="(comment, index) in post_data.comments"
        :key="index"
        :post_data="comment"
      />
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

  props: {
    post_data: Object,
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
  .post__comments {
    display: flex;
    flex-direction: column-reverse;
  }
}
@media screen and (max-width: 1200px) {
  .comments__card {
    width: 80vw;
  }
}
</style>
