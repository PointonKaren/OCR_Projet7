<template>
  <!--Carte de la publication-->
  <div class="post__card">
    <h2 class="post__title">Titre de l'image</h2>
    <div class="post__image">
      <img :src="require('@/assets/background.jpg')" alt="Titre" />
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
  .post__image {
    img {
      border-radius: 10px;
      border: 3px solid white;
      width: 30vw;
    }
  }
}
@media screen and (max-width: 1200px) {
  .post__card {
    margin-top: -10px;
    margin-bottom: 5px;
    .post__image {
      img {
        width: 90vw;
        max-width: 800px;
      }
    }
  }
}
</style>
