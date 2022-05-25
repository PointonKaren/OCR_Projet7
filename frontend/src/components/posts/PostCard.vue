<template>
  <!--Carte de la publication-->
  <div class="post__card">
    <div class="post__buttons">
      <button
        aria-label="Supprimer la publication"
        class="button delete post__delete"
      >
        <i class="fa-regular fa-trash-can test"></i>
      </button>
      <button
        aria-label="Modifier la publication"
        class="button edit post__edit"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
    <h2 class="post__title">Titre de l'image</h2>
    <div class="post__image">
      <img :src="require('@/assets/background.jpg')" alt="Titre" />
    </div>
    <div class="post__react">
      <!-- <router-link to="/:id/comment"> -->
      <div class="comments">
        <span @click="show = !show">
          <button
            aria-label="Commenter"
            class="button comment comment__button"
            @click="toggle"
            v-show="show"
          >
            Commenter
          </button>
          <button
            type="submit"
            class="button comment__button"
            @click="toggle"
            v-show="!show"
          >
            Poster le commentaire
          </button>
        </span>
        <button
          aria-label="Commenter"
          class="button comment comment__icon"
          @click="toggle"
        >
          <i class="fa-regular fa-comment-dots"></i>
        </button>
        <p class="number_of_comments">42</p>
      </div>
      <div class="likes">
        <p class="number_of_likes">42</p>
        <button aria-label="Aimer la publication" class="button heart">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
    <Transition>
      <div v-if="comment_form_is_here" class="add__comment">
        <CommentForm />
      </div>
    </Transition>
  </div>
</template>

<script>
import CommentForm from "../comments/CommentForm.vue";
export default {
  name: "PostCard",

  components: {
    CommentForm,
  },

  data() {
    return {
      comment_form_is_here: false,
      show: true,
    };
  },

  methods: {
    toggle() {
      this.comment_form_is_here = !this.comment_form_is_here;
    },
  },
};
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.post__card {
  position: relative;
  max-height: 800px;
  margin-bottom: 30px;
  .post__buttons {
    position: absolute;
    top: 0;
    right: -20px;
  }
  .post__title {
    margin-top: 15px;
    text-align: center;
  }
  .post__image {
    img {
      border-radius: 10px;
      border: 3px solid white;
      width: 30vw;
    }
  }
  .post__react {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0 10px;
    .comments {
      display: flex;
      .comment__icon {
        display: none;
      }
      .number_of_comments {
        margin: 0;
        margin-left: 5px;
        align-self: flex-end;
        font-size: 1.2em;
      }
    }
    .likes {
      display: flex;
      .number_of_likes {
        margin: 0;
        margin-right: 5px;
        align-self: flex-end;
        font-size: 1.2em;
      }
      .heart {
        padding-top: 10px;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .post__card {
    margin-top: -10px;
    margin-bottom: 5px;
    .post__buttons {
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      align-items: flex-end;
      height: 11vh;
      right: 0;

      .post__delete {
        font-size: 12px;
        width: 35px;
        padding: 6px 4px 6px 4px;
      }
      .post__edit {
        font-size: 12px;
        padding: 6px 6px 6px 9px;
      }
    }
    .post__title {
      margin-top: 30px;
    }
    .post__image {
      img {
        width: 92vw;
        max-width: 800px;
      }
    }
    .post__react {
      padding: 0px 10px 0 10px;
      .comments {
        .comment__button {
          display: none;
        }
        .comment__icon {
          font-size: 12px;
          border-radius: 50px;
          height: 35px;
          display: inline;
          padding: 4px 8px 4px 8px;
        }
        .number_of_comments {
          padding-bottom: 5px;
          font-size: 1em;
        }
      }
      .likes {
        display: flex;
        .number_of_likes {
          padding-bottom: 5px;
          font-size: 1em;
        }
        .heart {
          font-size: 12px;
          padding: 6px 8px 4px 8px;
        }
      }
    }
  }
}
</style>
