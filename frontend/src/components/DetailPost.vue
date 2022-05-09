<template>
  <div id="detailed__post">
    <!--Détail du post : carte image + carte commentaires -->
    <div id="cards">
      <PostCard />
      <CommentsCard />
    </div>
  </div>
</template>

<script>
import PostCard from "./PostCard.vue";
import CommentsCard from "./CommentsCard.vue";
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
  display: flex;
  flex-direction: row-reverse;
  #cards {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
