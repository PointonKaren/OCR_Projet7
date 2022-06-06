<template>
  <!--Détail du post : carte image + cartes commentaires -->
  <div id="detailed__post">
    <div id="cards">
      <div class="post__buttons">
        <button
          aria-label="Supprimer la publication"
          class="button delete"
          v-if="suppAuth"
        >
          <i class="fa-regular fa-trash-can test"></i>
        </button>
        <button
          aria-label="Modifier la publication"
          class="button edit"
          v-if="editAuth"
        >
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
      <PostCard
        v-for="(post, index) in postsData"
        :key="index"
        :post_data="post"
      />
      <div class="comments__header">
        <h2 class="comments__title">Espace de commentaires</h2>
        <span @click="show = !show">
          <button
            class="button add__comment__button"
            aria-label="Ajouter une publication"
            @click="toggle"
            v-show="show"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
          <button
            class="button add__comment__cancel"
            aria-label="Annuler"
            @click="toggle"
            v-show="!show"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </span>
      </div>
      <Transition>
        <div v-if="comment_form_is_here" class="add__comment">
          <CommentForm />
        </div>
      </Transition>
      <CommentsCascade
        v-for="(post, index) in postsData"
        :key="index"
        :post_data="post"
      />
    </div>
  </div>
</template>

<script>
import { instance } from "../../store/index.js";
import { ref } from "vue";
import { mapState } from "vuex";

import PostCard from "../posts/PostCard.vue";
import CommentForm from "../comments/CommentForm.vue";
import CommentsCascade from "../comments/CommentsCascade.vue";

export default {
  name: "DetailedPost",

  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  props: {
    pdata: Object,
  },

  data() {
    return {
      comment_form_is_here: false,
      show: true,
      postInfo: null,
      editAuth: false,
      suppAuth: false,
      posts: [this.$store.state.post],
      haveComments: false,
    };
  },

  components: {
    PostCard,
    CommentForm,
    CommentsCascade,
  },

  methods: {
    toggle() {
      this.comment_form_is_here = !this.comment_form_is_here;
    },
  },

  setup() {
    class Post {
      constructor(id, title, author, created_at, image_url, likes, comments) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.created_at = created_at;
        this.image_url = image_url;
        this.likes = likes;
        this.comments = comments;
      }
    }

    let postsData = ref([]);

    const makeDataPost = (post) => {
      // convert timestamp to date
      let date = new Date(post.createdAt);

      // convert date to string
      let dateString =
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        (date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "/" +
        date.getFullYear() +
        " à " +
        date.getHours() +
        "h" +
        (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());

      const firstName =
        post?.User?.firstName === undefined
          ? "Utilisateur"
          : post.User.firstName;
      const lastName =
        post?.User?.lastName === undefined ? "supprimé" : post.User.lastName;

      const author = firstName + " " + lastName;

      const new_post = new Post(
        post.id,
        post.title,
        author,
        dateString,
        post.imageUrl,
        post.Likes,
        post.Comments
      );

      postsData.value.push(new_post);
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.userId;

    let data = {
      data: {
        userId: userId,
      },
    };

    instance.defaults.headers["Content-Type"] = "application/json";

    const postId = window.location.href.split("/")[4];

    instance.post(`/post/${postId}`, data).then((res) => {
      makeDataPost(res.data.post);
    });

    return {
      postsData,
    };
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

#detailed__post {
  background-color: $background;
  border: 2px solid $primaire;
  width: 900px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row-reverse;
  margin: auto;
  margin-top: 5vh;
  #cards {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .comments__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .comments__title {
        margin-right: 20px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  #detailed__post {
    width: 95vw;
    margin-top: 2vh;
    #cards {
      .comments__header {
        width: 90vw;
        .comments__title {
          font-size: 1.3em;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
