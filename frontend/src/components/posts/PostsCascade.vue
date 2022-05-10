<template>
  <!--Détail du post : carte image + carte commentaires -->
  <div id="posts__cascade">
    <h1 id="posts__cascade__title">Dernières publications</h1>
    <a href="#posts__cascade"
      ><button class="button arrow_up">
        <i class="fa-solid fa-arrow-up"></i></button
    ></a>
    <div id="cascade">
      <MinifiedPost v-for="(card, index) in 3" :key="index" />
    </div>
  </div>
</template>

<script>
import MinifiedPost from "./MinifiedPost.vue";
export default {
  name: "PostsCascade",
  components: {
    MinifiedPost,
  },
};
</script>

<style lang="scss">
#posts__cascade {
  #posts__cascade__title {
    text-align: center;
  }
  .arrow_up {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}
</style>
