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
  border: 2px solid #091f43;
  width: 900px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 3px 4px 20px #091f43;
  display: flex;
  flex-direction: row-reverse;
  margin: auto;
  margin-bottom: 100px;
  #cards {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
