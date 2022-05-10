<template>
  <!--Carte des commentaires-->
  <div class="comments__card">
    <div class="comments__header">
      <h2 class="comments__title">Commentaires</h2>
    </div>
    <BoxComment />
    <BoxComment />
    <BoxComment />
  </div>
</template>

<script>
import BoxComment from "./BoxComment.vue";
export default {
  name: "Comments__Card",
  components: {
    BoxComment,
  },
};
</script>

<style lang="scss">
.comments__card {
  margin: 0;
  width: 30vw;
  .comments__header {
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    .comments__title {
      margin: 0;
      margin: auto;
      margin-top: 15px;
    }
  }
}
</style>
