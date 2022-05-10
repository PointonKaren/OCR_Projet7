<template>
  <!-- Bloc "Commentaire" -->
  <div class="comment__card">
    <div class="comment__buttons">
      <button class="button delete post__delete">
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <button class="button edit">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
    <p class="comment__text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
      consequuntur.
    </p>
  </div>
</template>

<script>
export default {
  name: "BoxComment",
};
</script>

<style lang="scss">
.comment__card {
  border: 2px solid white;
  box-shadow: 3px 4px 7px grey;
  border-radius: 20px;
  margin-bottom: 20px;
  width: 30vw;
  .comment__buttons {
    padding-right: 10px;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .comment__text {
    text-align: center;
  }
}
</style>
