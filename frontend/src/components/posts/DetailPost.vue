<template>
  <!--Détail du post : carte image + cartes commentaires -->
  <div id="detailed__post">
    <div id="cards">
      <PostCard />
      <CommentsCard />
    </div>
  </div>
</template>

<script>
import PostCard from "../posts/PostCard.vue";
import CommentsCard from "../comments/CommentsCard.vue";
export default {
  name: "DetailPost",
  components: {
    PostCard,
    CommentsCard,
  },
};
</script>

<style lang="scss">
#detailed__post {
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  width: 900px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row-reverse;
  margin: auto;
  margin-top: 12vh;
  #cards {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media screen and (max-width: 1200px) {
  #detailed__post {
    width: 95vw;
    border: 1px solid red;
    margin-top: 2vh;
  }
}
</style>
