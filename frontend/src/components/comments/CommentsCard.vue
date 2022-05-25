<template>
  <!--Carte des commentaires-->
  <div class="comments__card">
    <div class="comments__header">
      <h2 class="comments__title">Commentaires</h2>
    </div>
    <div class="post__comments">
      <BoxComment />
      <BoxComment />
      <BoxComment />
      <BoxComment />
      <BoxComment />
      <BoxComment />
    </div>
  </div>
</template>

<script>
import BoxComment from "./BoxComment.vue";
export default {
  name: "CommentsCard",
  components: {
    BoxComment,
  },
};
</script>

<style lang="scss">
.comments__card {
  width: 30vw;
  border: 1px solid yellow;
  .comments__header {
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    .comments__title {
      margin: auto;
    }
  }
  .post__comments {
    border: 1px solid blue;
  }
}
@media screen and (max-width: 1200px) {
  .comments__card {
    width: 80vw;
  }
}
</style>
