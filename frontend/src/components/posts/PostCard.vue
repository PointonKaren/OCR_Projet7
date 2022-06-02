<template>
  <!--Carte de la publication-->
  <div class="post__card">
    <h2 class="post__title">{{ post_data.title }}</h2>
    <div class="post__image">
      <img :src="post_data.image_url" alt="Titre" />
    </div>
    <p class="post__infos">
      Postée par {{ post_data.author }} le {{ post_data.created_at }}
    </p>
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
@import "./scss/_buttons.scss";

.post__card {
  background-color: $background;
  width: 35vw;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 20px;
  text-decoration: none;
  .post__infos {
    align-self: flex-end;
    margin-right: 10px;
  }
  .post__image {
    img {
      border-radius: 10px;
      border: 5px solid white;
      max-width: 30vw;
    }
  }
}
@media screen and (max-width: 1200px) {
  .post__card {
    width: 90vw;
    margin-bottom: 5px;
    .post__image {
      img {
        width: 90vw;
        max-width: 800px;
        border: 2px solid white;
      }
    }
    .post__infos {
      font-size: 12px;
    }
  }
}
</style>
