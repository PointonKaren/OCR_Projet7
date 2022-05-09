<template>
  <div class="comments__card">
    <!--Carte des commentaires-->
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
  border: 1px solid skyblue;
  width: 30vw;
  .comments__header {
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid yellow;
    padding-bottom: 20px;
    .comments__title {
      color: skyblue;
      margin: 0;
      margin: auto;
      margin-top: 15px;
    }
  }
}
</style>
