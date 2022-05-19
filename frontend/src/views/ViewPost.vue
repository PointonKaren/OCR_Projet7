<template>
  <div id="post">
    <router-link to="/post">
      <button aria-label="Retour à l'accueil" class="button button__back">
        <i class="fa-solid fa-reply"></i></button
    ></router-link>
    <DetailPost />
  </div>
</template>

<script>
import DetailPost from "../components/posts/DetailPost.vue";
export default {
  name: "ViewPost",
  components: {
    DetailPost,
  },
  data: function () {
    return {
      mode: "login",
    };
  },
  // methods: {
  // },
};
</script>

<style lang="scss">
#post {
  margin: auto;
  width: 45vw;
  display: flex;
  position: relative;
  border: 1px solid yellow;
  .button__back {
    border-radius: 50px;
    position: absolute;
    left: 2vw;
    top: 2vh;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-right: 9px;
  }
}

@media screen and (max-width: 1200px) {
  #post {
    width: 95vw;
    .button__back {
      top: 3vh;
      left: 1vw;
      font-size: 12px;
      padding-bottom: 6px;
      padding-top: 8px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
}
</style>
