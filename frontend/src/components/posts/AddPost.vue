<template>
  <!--Post minifié -->
  <div id="add__post">
    <form method="post" action="traitement.org">
      <label class="label__add__post" for="url">Envoyer un gif:</label>
      <input
        class="input__add__post"
        type="url"
        name="url"
        id="url"
        value="http://"
      />
      <input type="submit" value="Envoyer" class="button send" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPost",
  components: {},
};
</script>

<style lang="scss">
#add__post {
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  width: 400px;
  margin: auto;
  label {
    padding-right: 20px;
  }
}
</style>
