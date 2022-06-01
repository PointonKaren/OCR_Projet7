<template>
  <!--Détail du post : carte image + cartes commentaires -->
  <div id="detailed__post">
    <div id="cards">
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
      <PostCard v-for="(post, index) in postsData"
        :key="index"
        :post_data="post"
      />
      <div class="post__react">
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
              aria-label="Poster le commentaire"
              type="submit"
              class="button comment__button"
              @click="toggle"
              v-show="!show"
            >
              Poster le commentaire
            </button>
          </span>
          <span @click="show = !show">
            <button
              aria-label="Commenter"
              class="button comment comment__icon"
              @click="toggle"
              v-show="show"
            >
              <i class="fa-regular fa-comment-dots"></i>
            </button>
            <button
              aria-label="Poster le commentaire"
              class="button comment comment__icon"
              @click="toggle"
              v-show="!show"
            >
              <i class="fa-solid fa-check"></i>
            </button>
          </span>
          <p class="number_of_comments">
              1
            </p>
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
      <CommentsCard v-for="(post, index) in postsData"
        :key="index"
        :post_data="post"
      />
    </div>
  </div>
</template>

<script>
import { instance } from "../../store/index.js";
import { ref } from 'vue'
import PostCard from "../posts/PostCard.vue";
import CommentForm from "../comments/CommentForm.vue";
import CommentsCard from "../comments/CommentsCard.vue";

export default {
  name: "DetailedPost",

  data() {
    return {
      comment_form_is_here: false,
      show: true,
      postInfo: null,
      editAuth: false,
      suppAuth: false,
    };
  },


  components: {
    PostCard,
    CommentForm,
    CommentsCard,
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
        ((date.getMonth() + 1) > 9
          ? (date.getMonth() + 1)
          : "0" + (date.getMonth() + 1)) +
        "/" +
        date.getFullYear() +
          " à " +
          date.getHours() +
          "h" +
          date.getMinutes();

      const firstName = post?.User?.firstName === undefined ? "Utilisateur" : post.User.firstName;
      const lastName = post?.User?.lastName === undefined ? "supprimé" : post.User.lastName;

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
    .post__buttons {
      position: absolute;
      right: 6vw;
    }
    .post__title {
      margin-top: 15px;
      text-align: center;
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
        .heart {
          padding-top: 10px;
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  #detailed__post {
    width: 95vw;
    margin-top: 2vh;
    #cards {
      .post__buttons {
        font-size: 12px;
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
        margin-top: 50px;
      }
      .post__react {
        width: 80vw;
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
}
</style>
