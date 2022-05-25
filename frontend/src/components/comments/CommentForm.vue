<template>
  <!-- Formulaire de commentaire -->
  <div id="comment" v-show="!here">
    <form class="comment__form" @submit.prevent="submitComment">
      <label for="comment__textarea"
        ><h2 class="comment__title">Ecrivez votre commentaire :</h2>
      </label>
      <textarea id="comment__textarea" v-model="comment"></textarea>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentForm",

  data() {
    return {
      comment: "",
    };
  },

  methods: {
    submitComment() {
      axios.put("/comment/:id", { content: this.comment });
    },
  },
};
</script>

<style lang="scss">
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
      border: 1px solid #d1515a;
      padding-top: 5px;
      padding-left: 5px;
      border-radius: 10px;
      width: 30vw;
      max-width: 500px;
      height: 10vh;
      max-height: 100px;
      resize: none;
      &:focus {
        color: white;
        background-color: #091f435d;
        border: 1px solid white;
        outline: 1px solid white;
      }
    }
    .comment__button {
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .comment__icon {
      display: none;
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
      .comment__button {
        display: none;
      }
      .comment__icon {
        margin-top: 1vh;
        font-size: 12px;
        border-radius: 50px;
        height: 35px;
        display: inline;
        padding: 4px 8px 4px 8px;
      }
    }
  }
}
</style>
