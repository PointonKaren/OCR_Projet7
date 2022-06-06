<template>
  <!--Carte des commentaires-->
  <div class="comments__card">
    <CommentCard
      v-for="(comment, index) in post_data.comments"
      :key="index"
      :post_data="comment"
    />
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
export default {
  name: "CommentsCard",

  data() {
    return {
      comment_form_is_here: false,
      show: true,
    };
  },
  components: {
    CommentCard,
  },

  props: {
    post_data: Object,
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

.comments__card {
  width: 30vw;
  display: flex;
  flex-direction: column-reverse;
}
@media screen and (max-width: 1200px) {
  .comments__card {
    width: 80vw;
  }
}
</style>
