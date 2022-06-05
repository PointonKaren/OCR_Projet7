<template>
  <!-- Formulaire de commentaire -->
  <div id="comment" v-show="!here">
    <form class="comment__form" @submit.prevent="submitComment">
      <label for="comment__textarea"
        ><h3 class="comment__title">Ecrivez votre commentaire :</h3>
      </label>
      <textarea id="comment__textarea" v-model="comment"></textarea>
      <input
        type="submit"
        value="Envoyer"
        aria-label="Envoyer le fichier"
        class="button button__submit__comment"
      />
    </form>
  </div>
</template>

<script>
import { instance } from "../../store/index.js";

export default {
  name: "CommentForm",

  data() {
    return {
      comment: "",
    };
  },

  methods: {
    submitComment() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      const postId = this.$route.params.id;

      let data = {
        data: {
          userId: userId,
          message: this.comment,
        },
      };

      instance
        .post(`/post/${postId}/comment`, data)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

#comment {
  display: flex;
  align-items: center;
  margin: auto;
  padding-top: 15px;
  .comment__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    #comment__textarea {
      border: 1px solid $tertiaire;
      padding-top: 5px;
      padding-left: 5px;
      border-radius: 10px;
      width: 30vw;
      max-width: 500px;
      height: 10vh;
      max-height: 100px;
      resize: none;
      &:focus {
        @include focus;
      }
    }
    .comment__button {
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
}
@media screen and (max-width: 1200px) {
  #comment {
    width: 90vw;
    .comment__form {
      .comment__title {
        text-align: center;
      }
      #comment__textarea {
        height: 10vh;
        width: 80vw;
      }
    }
  }
}
</style>
