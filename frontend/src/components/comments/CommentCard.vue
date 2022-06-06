<template>
  <!-- Bloc "Commentaire" -->
  <div class="comment__card">
    <div class="comment__buttons">
      <button
        aria-label="Supprimer le commentaire"
        class="button delete"
        v-bind="{ id: post_data.id }"
        v-if="suppAuth"
        @click="deleteComment"
      >
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <button
        aria-label="Modifier le commentaire"
        class="button edit"
        v-if="editAuth"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
    <div class="comment__data">
      <p class="comment__user">{{ author }}</p>
      <p class="comment__date">Posté le {{ createdAt }}</p>
    </div>
    <p class="comment__text">
      {{ message }}
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { instance } from "../../store/index.js";

export default {
  name: "CommentCard",

  data() {
    return {
      author: "",
      message: "",
      postId: "",
      createdAt: "",
      editAuth: false,
      suppAuth: false,
    };
  },

  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  props: {
    post_data: Object,
  },

  beforeMount() {
    const firstName = this.post_data?.User?.firstName
      ? this.post_data?.User.firstName
      : "Utilisateur";
    const lastName = this.post_data?.User?.lastName
      ? this.post_data?.User.lastName
      : "supprimé";
    this.author = `${firstName} ${lastName}`;
    this.message = this.post_data.message;
    this.postId = this.post_data.id;

    const postDate = new Date(this.post_data.createdAt);

    this.createdAt =
      (postDate.getDate() > 9 ? postDate.getDate() : "0" + postDate.getDate()) +
      "/" +
      (postDate.getMonth() + 1 > 9
        ? postDate.getMonth() + 1
        : "0" + (postDate.getMonth() + 1)) +
      "/" +
      postDate.getFullYear() +
      " à " +
      postDate.getHours() +
      "h" +
      (postDate.getMinutes() > 9
        ? postDate.getMinutes()
        : "0" + postDate.getMinutes());

    if (
      this.user.id === this.post_data?.UserId ||
      this.user.role === 1 ||
      this.user.role === 2
    ) {
      this.suppAuth = true;
    }

    if (this.user.id === this.post_data?.UserId || this.user.role === 2) {
      this.editAuth = true;
    }
  },

  methods: {
    deleteComment(e) {
      console.log(e);

      const commentId = e.path[1].id;

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      instance
        .delete(`/comment/${commentId}`, {
          data: {
            userId: userId,
          },
        })
        .then((response) => {
          console.log(response);
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

.comment__card {
  background-color: white;
  box-shadow: 3px 4px 7px $secondaire;
  border-radius: 20px;
  margin: auto;
  margin-bottom: 20px;
  width: 30vw;
  .comment__buttons {
    padding-right: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .comment__data {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .comment__user {
      font-size: 1.1em;
      font-weight: bold;
      margin: 0;
      margin-left: 10px;
    }
    .comment__date {
      margin: 0;
      margin-right: 10px;
    }
  }
  .comment__text {
    margin-top: 0;
    padding-left: 10px;
    padding-right: 10px;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
@media screen and (max-width: 1200px) {
  .comment__card {
    width: 80vw;
    max-width: 800px;

    .comment__data {
      padding: 0;
      font-size: 12px;
      .comment__user {
        width: 50vw;
        align-self: center;
      }
      .comment__date {
        width: 50vw;
        text-align: end;
      }
    }
  }
}
</style>
