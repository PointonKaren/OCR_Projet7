<template>
  <!--Carte de l'image-->
  <div class="post__card">
    <div class="post__header">
      <h2 class="post__title">Titre de l'image</h2>
      <button class="button post__delete">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
    <div class="post__image"></div>
    <div class="post__react">
      <button class="button comment">Commenter</button>
      <button class="button likes"><i class="fa-solid fa-heart"></i></button>
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
  margin: 0;
  border: 1px solid green;
  width: 30vw;
  height: 40vh;
  .post__header {
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid turquoise;
    .post__delete {
      color: green;
      align-self: flex-start;
    }
    .post__title {
      color: green;
      margin: 0;
      margin: auto;
      margin-top: 15px;
    }
  }
  .post__image {
    margin-top: 10px;
    background-image: url("https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC8zNzg4MDJiMC1jNTI4LTQ4MjktYjBiNS0wY2M2NDBkZjYzY2QuanBlZw==");
    height: 70%;
    background-size: cover;
    background-position: center;
  }
  .post__react {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    .button {
      color: green;
      padding: 0;
    }
  }
}
</style>
