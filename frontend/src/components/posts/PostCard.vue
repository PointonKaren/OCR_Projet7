<template>
  <div class="postcard">
    <div class="post__buttons">
      <button
        aria-label="Supprimer la publication"
        class="button delete"
        v-bind="{ id: post_data.id }"
        v-if="suppAuth"
        @click="deletePost"
      >
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <button
        aria-label="Modifier la publication"
        class="button edit"
        v-if="editAuth"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
    <router-link
      :to="{ name: 'post', params: { id: post_data.id } }"
      :pdata="post_data"
      class="detailed__post-link"
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
      <p class="number_of_comments">
        {{ post_data.comments.length }} commentaire(s)
      </p>
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
    if (
      this.user.id === this.post_data?.authorId ||
      this.user.role === 1 ||
      this.user.role === 2
    ) {
      this.suppAuth = true;
    }

    if (this.user.id === this.post_data?.authorId || this.user.role === 2) {
      this.editAuth = true;
    }
  },

  methods: {
    deletePost(e) {
      const cardPostId = e.path[1].id;

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      const data = {
        data: {
          userId: userId,
        },
      };

      instance
        .delete(`/post/${cardPostId}`, data)
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
        data: {
          userId: userId,
        },
      };

      instance
        .post(`/post/${cardPostId}/like`, data)
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

.postcard {
  background-color: $background;
  width: 35vw;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 20px;
  text-decoration: none;
  .post__buttons {
    align-self: flex-end;
    margin-right: 10px;
    margin-top: 10px;
    position: absolute;
  }
  .detailed__post-link {
    text-decoration: none;
    .post__title {
      text-align: center;
    }
    .post__image {
      margin-bottom: -10px;
      img {
        border-radius: 10px;
        border: 5px solid white;
        max-width: 30vw;
      }
    }
    .post__infos {
      text-align: end;
      margin-right: 10px;
      margin-bottom: 0;
    }
  }
  .post__react {
    width: 30vw;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    .number_of_comments {
      font-size: 1.2em;
    }
    .likes {
      display: flex;
      align-items: center;
      .number_of_likes {
        margin: 0;
        margin-right: 5px;
        font-size: 1.2em;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .postcard {
    width: 95vw;
    margin-bottom: 5px;
    .post__buttons {
      position: initial;
    }
    .detailed__post-link {
      .post__title {
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 1.4em;
      }
      .post__image {
        img {
          width: 90vw;
          max-width: 800px;
          border: 2px solid white;
        }
      }
      .post__infos {
        font-size: 12px;
        width: 100%;
        text-align: center;
      }
    }
    .post__react {
      width: 90vw;
      .number_of_comments {
        font-size: 1em;
      }
      .likes {
        .number_of_likes {
          font-size: 1em;
        }
      }
    }
  }
}
</style>
