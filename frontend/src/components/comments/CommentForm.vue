<template>
  <!-- Formulaire de commentaire -->
  <div id="comment" v-show="!here">
    <!-- <router-link to="/post/:id">
      <button aria-label="Retour à la publication" class="button button__back">
        <i class="fa-solid fa-reply"></i></button
    ></router-link> -->
    <form class="comment__form" @submit.prevent="submitComment">
      <label for="comment__textarea"> Poster un commentaire : </label>
      <textarea id="comment__textarea" v-model="comment"></textarea>
      <button type="submit" class="button comment__button">
        Poster le commentaire
      </button>
      <button aria-label="Commenter" class="button comment comment__icon">
        <i class="fa-regular fa-comment-dots"></i>
      </button>
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
  width: 40vw;
  max-width: 600px;
  margin: auto;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  padding-top: 15px;
  position: absolute;
  top: 580px;
  left: 5vw;
  .comment__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    #comment__textarea {
      border: 1px solid #d1515a;
      padding-top: 5px;
      padding-left: 5px;
      margin-top: 20px;
      border-radius: 10px;
      width: 30vw;
      max-width: 500px;
      height: 10vw;
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
  .button__back {
    border-radius: 50px;
    position: absolute;
    left: 2vw;
    top: 6vh;
    padding: 9px 9px 6px 9px;
  }
}
@media screen and (max-width: 1200px) {
  #comment {
    height: 70vh;
    width: 85vw;
    .comment__form {
      #comment__textarea {
        height: 50vh;
        width: 75vw;
        max-width: 500px;
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
