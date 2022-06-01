<template>
  <!--Carte de la publication-->
  <div class="post__card">
    <h2 class="post__title">{{ post_data.title }}</h2>
    <h3>{{ post_data.author }}</h3>
    <p>Créé le {{ post_data.created_at }}</p>
    <div class="post__image">
      <img :src="post_data.image_url" alt="Titre" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  props: {
    post_data: Object,
  },

  name: "PostCard",

  method: function () {
    console.log(this.$store.state.user.userId);
    return;
  },

  data() {
    return {
      posts: [this.$store.state.post],
    };
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

.post__card {
  max-height: 800px;
  margin-bottom: 30px;
  .post__image {
    img {
      border-radius: 10px;
      border: 3px solid white;
      width: 30vw;
    }
  }
}
@media screen and (max-width: 1200px) {
  .post__card {
    margin-top: -10px;
    margin-bottom: 5px;
    .post__image {
      img {
        width: 90vw;
        max-width: 800px;
      }
    }
  }
}
</style>
