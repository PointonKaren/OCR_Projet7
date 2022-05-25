<template>
  <!-- Bloc "Commentaire" -->
  <div class="comment__card">
    <div class="comment__buttons">
      <button
        aria-label="Supprimer le commentaire"
        class="button delete post__delete"
      >
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <button aria-label="Modifier le commentaire" class="button edit">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
    <p class="comment__user">Prénom Nom</p>
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
  border: 1px solid white;
  background-color: white;
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
  .comment__user {
    font-size: 1.1em;
    font-weight: bold;
    text-decoration: underline;
    text-decoration-color: #d1515a;
    margin-left: 10px;
  }
  .comment__text {
    text-align: center;
  }
}
@media screen and (max-width: 1200px) {
  .comment__card {
    width: 80vw;
  }
}
</style>
