<template>
  <div>
    <HeaderLogged />
    <div id="post">
      <router-link to="/post">
        <button aria-label="Retour à l'accueil" class="button button__back">
          <i class="fa-solid fa-reply"></i></button
      ></router-link>
      <DetailedPost />
    </div>
  </div>
</template>

<script>
import HeaderLogged from "../components/others/HeaderLogged.vue";
import DetailedPost from "../components/posts/DetailedPost.vue";
export default {
  name: "ViewPost",
  components: {
    HeaderLogged,
    DetailedPost,
  },
  data: function () {
    return {
      mode: "login",
    };
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

#post {
  margin: auto;
  width: 45vw;
  display: flex;
  position: relative;
  .button__back {
    border-radius: 50px;
    position: absolute;
    left: 2vw;
    top: 6vh;
    padding: 9px 9px 6px 9px;
  }
}

@media screen and (max-width: 1200px) {
  #post {
    width: 95vw;
    .button__back {
      top: 3vh;
      left: 1vw;
      font-size: 12px;
      padding: 8px 8px 6px 8px;
    }
  }
}
</style>
