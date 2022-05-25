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
      <MinifiedPost v-for="(card, index) in 3" :key="index" />
    </div>
  </div>
</template>

<script>
import MinifiedPost from "./MinifiedPost.vue";
import AddPost from "../posts/AddPost.vue";

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
#posts__cascade {
  #posts__cascade__header {
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
    #posts__cascade__title {
      color: white;
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
