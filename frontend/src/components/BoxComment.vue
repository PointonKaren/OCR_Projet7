<template>
  <div class="comment__card">
    <!-- Commentaire -->
    <div class="comment__buttons">
      <button class="button post__delete">
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <br />
      <button class="button edit">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
    <p class="comment__text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
      consequuntur.
    </p>
    <button class="button likes"><i class="fa-solid fa-heart"></i></button>
  </div>
</template>

<script>
export default {
  name: "BoxComment",
};
</script>

<style lang="scss">
.comment__card {
  margin: 0;
  border: 1px solid violet;
  width: 30vw;
  .comment__buttons {
    display: flex;
    justify-content: flex-end;
  }
  .comment__text {
    text-align: center;
  }
}
</style>
