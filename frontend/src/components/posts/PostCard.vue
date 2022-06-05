<template>
  <div class="minified__post">
    <div class="comment__buttons">
      <button
        aria-label="Supprimer le commentaire"
        class="button delete post__delete"
        v-bind="{ id: post_data.id }"
        v-if="suppAuth"
        @click="deletePost"
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
    <router-link
      :to="{ name: 'post', params: { id: post_data.id } }"
      class="minified__post"
      :pdata="post_data"
    >
      <h2 class="post__title">{{ post_data.title }}</h2>
      <div class="post__image">
        <img :src="post_data.image_url" alt="Titre" />
      </div>
      <p class="post__infos">
        Postée par {{ post_data.author }} le {{ post_data.created_at }}
      </p>
    </router-link>

    <div class="post__react">
      <div class="comments">
        <p class="number__of__comments__per__post">
          {{ post_data.comments.length }} commentaire(s)
        </p>
      </div>
      <div class="likes">
        <p class="number_of_likes">{{ post_data.likes.length }}</p>
        <button
          aria-label="Aimer la publication"
          class="button heart"
          v-bind="{ id: post_data.id }"
          @click="likePost"
        >
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Ajouter bouton suppr/edit publication
import { instance } from "../../store/index.js";
import { mapState } from "vuex";
export default {
  name: "PostCard",

  props: {
    post_data: Object,
  },
  data() {
    return {
      postId: this.post_data.id,
      editAuth: false,
      suppAuth: false,
    };
  },

  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },


  beforeMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.userId;
    if (
      this.user.id === userId ||
      this.user.role === 1 ||
      this.user.role === 2
    ) {
      this.suppAuth = true;
    }

    if (this.user.id === userId || this.user.role === 2) {
      this.editAuth = true;
    }
  },

  methods: {
    deletePost(e) {
      const cardPostId = e.path[1].id;

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      const data = {
        data : {
          userId: userId,
        },
      };

      instance.delete(`/post/${cardPostId}`, data)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });

    },

    likePost(e) {
      const cardPostId = e.path[1].id;

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      const data = {
        data : {
          userId: userId,
        },
      };

      instance.post(`/post/${cardPostId}/like`, data)
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

.minified__post {
  background-color: $background;
  border: 2px solid $primaire;
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
  .minified__post__react {
    display: flex;
    width: 30vw;
    max-width: 800px;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .comment__buttons {
    padding-right: 10px;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}

.post__react {
  width: 30vw;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
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
  }
}

@media screen and (max-width: 1200px) {
  .minified__post {
    width: 95vw;
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
    .minified__post__react {
      width: 90vw;
    }
  }
}
</style>
