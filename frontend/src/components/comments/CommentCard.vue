<template>
  <!-- Bloc "Commentaire" -->
  <div class="comment__card">
    <div class="comment__buttons">
      <button
        aria-label="Supprimer le commentaire"
        class="button delete post__delete"
        v-if="suppAuth"
      >
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <button aria-label="Modifier le commentaire" class="button edit" v-if="editAuth">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
    <p class="comment__user">{{ author }} </p>
    <p class="comment__text">
      {{ message }}
    </p>
  </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "CommentCard",

  data() {
    return {
      author: "",
      message: "",
      postId: "",
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
    const firstName = this.post_data?.User?.firstName ? this.post_data?.User.firstName : "Utilisateur";
    const lastName = this.post_data?.User?.lastName ? this.post_data?.User.lastName : "supprimé";
    this.author = `${firstName} ${lastName}`;
    this.message = this.post_data.message;
    this.postId = this.post_data.id;

    if ((this.user.id === this.post_data?.UserId) || (this.user.role === 1) || (this.user.role === 2)) {
      this.suppAuth = true;
    }

    if ((this.user.id === this.post_data?.UserId)  || (this.user.role === 2)) {
      this.editAuth = true;
    }

  },


};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

.comment__card {
  border: 1px solid white;
  background-color: white;
  box-shadow: 3px 4px 7px $secondaire;
  border-radius: 20px;
  margin-bottom: 20px;
  width: 30vw;
  .comment__buttons {
    padding-right: 10px;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .comment__user {
    font-size: 1.1em;
    font-weight: bold;
    margin-left: 10px;
  }
  .comment__text {
    padding-left: 10px;
    padding-right: 10px;
  }
}
@media screen and (max-width: 1200px) {
  .comment__card {
    width: 80vw;
  }
}
</style>
