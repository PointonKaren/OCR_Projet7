<template>
  <!--Carte de l'image-->
  <div class="post__card">
    <div class="post__buttons">
      <button class="button delete post__delete">
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <button class="button edit">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
    <h2 class="post__title">Titre de l'image</h2>
    <div class="post__image">
      <img :src="require('@/assets/background.jpg')" />
    </div>
    <div class="post__react">
      <router-link to="/:id/comment">
        <div class="comments">
          <button class="button comment">Commenter</button>
          <p class="number_of_comments">42</p>
        </div>
      </router-link>
      <router-link to="/:id/like">
        <div class="likes">
          <button class="button heart">
            <i class="fa-regular fa-heart"></i>
          </button>
          <p class="number_of_likes">42</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
};
</script>

<style lang="scss">
.post__card {
  max-height: 800px;
  margin-bottom: 30px;
  .post__buttons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: -50px;
  }
  .post__title {
    margin-top: 15px;
    text-align: center;
  }
  .post__image {
    img {
      border-radius: 10px;
      border: 3px solid white;
      max-height: 512px;
    }
  }
  .post__react {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0 10px;
    .comments {
      display: flex;
      .number_of_comments {
        margin: 0;
        margin-left: 5px;
        align-self: flex-end;
      }
    }
    .likes {
      display: flex;
      .number_of_likes {
        margin: 0;
        margin-left: 5px;
        align-self: flex-end;
      }
    }
  }
}
</style>
