<template>
  <!-- Cascade des publications -->
  <div id="posts__cascade">
    <div id="posts__cascade__header">
      <h1 id="posts__cascade__title">Dernières publications</h1>
      <span @click="show = !show">
        <button
          class="button add__post__button"
          aria-label="Ajouter une publication"
          @click="toggle"
          v-show="show"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
        <button
          class="button add__post__cancel"
          aria-label="Annuler"
          @click="toggle"
          v-show="!show"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    </div>
    <a href="#posts__cascade"
      ><button
        aria-label="Retourner en haut de la page"
        class="button arrow_up"
      >
        <i class="fa-solid fa-arrow-up"></i></button
    ></a>
    <Transition>
      <div v-if="add_post_is_here" class="add__post">
        <AddPost />
      </div>
    </Transition>
    <div id="cascade">
      <MinifiedPost
        v-for="(post, index) in postsData"
        :key="index"
        :post_data="post"
      />
    </div>
  </div>
</template>

<script>
import { instance } from "../../store/index.js";
import MinifiedPost from "./MinifiedPost.vue";
import AddPost from "../posts/AddPost.vue";

/* import BDD from "../../BDD";*/
import { ref } from "vue";

export default {
  name: "PostsCascade",

  components: {
    MinifiedPost,
    AddPost,
  },

  data() {
    return {
      show: true,
      add_post_is_here: false,
    };
  },

  methods: {
    toggle() {
      this.add_post_is_here = !this.add_post_is_here;
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

    const makeDataPost = (database) => {

      for (const post of database) {
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
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.userId;

    let data = {
      data: {
        userId: userId,
      },
    };

    instance.defaults.headers["Content-Type"] = "application/json";

    instance.post(`/post/`, data).then((res) => {
      makeDataPost(res.data.posts);
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
#posts__cascade {
  #posts__cascade__header {
    width: 35vw;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    #posts__cascade__title {
      text-align: center;
    }
    .add__post__button,
    .add__post__cancel {
      margin-left: 2vw;
      border-radius: 50px;
    }
    .add__post__cancel {
      font-size: 1em;
      padding-left: 12px;
      padding-right: 12px;
    }
  }
  .arrow_up {
    border-radius: 50px;
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}
@media screen and (max-width: 1200px) {
  #posts__cascade {
    #posts__cascade__header {
      width: 95vw;
      #posts__cascade__title {
        color: white;
      }
      .add__post__button,
      .add__post__cancel {
        margin: 0;
        margin-right: 5vw;
      }
    }
    .arrow_up {
      z-index: 10;
      padding: 7px 8px 5px 8px;
      font-size: 12px;
      bottom: 0px;
      right: 0px;
    }
    margin-bottom: -50px;
  }
}
</style>
