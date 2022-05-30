<template>
  <!--Bloc "Création de publication" -->
  <div id="add__post">
    <h2 class="add__post__title">Importer une image</h2>
    <form
      method="POST"
      id="form"
      @submit.prevent="addPost"
      enctype="multipart/form-data"
    >
      <div>
        <label for="title">Titre de la publication :</label>
        <br />
        <input
          type="text"
          placeholder="Ecrire un titre"
          name="title"
          v-model="title"
        />
      </div>
      <div>
        <label>Sélectionner un fichier : </label>
        <input
          ref="file"
          v-on:change="handleFileUpload()"
          type="file"
          class="select__file"
          accept="image/*"
          required
        />
      </div>
      <button
        aria-label="Envoyer le fichier"
        class="button button__submit__file"
      >
        Envoyer
      </button>
    </form>
  </div>
</template>

<script>
// import axios from "axios";
import { ref } from "vue";

export default {
  name: "AddPost",

  setup() {
    const file = ref(null);
    const handleFileUpload = async () => {
      // debugger;
      console.log("selected file", file.value.files);
      //Upload to server
    };

    return {
      handleFileUpload,
      file,
    };
  },

  // data() {
  //   return {
  //     formData: {
  //       userId: "",
  //       title: "",
  //       file: null,
  //     },
  //   };
  // },

  /**
   * Créer une publication
   */
  // submitFile() {
  //   let formData = new FormData();

  //   formData.append("file", this.file);

  //   axios
  //     .post("http://localhost:3000/api/post/", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then(function () {
  //       console.log("SUCCESS!!");
  //     })
  //     .catch(function () {
  //       console.log("FAILURE!!");
  //     });
  // },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

#add__post {
  background-color: $background;
  border: 2px solid $primaire;
  width: 35vw;
  max-width: 900px;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  label {
    padding-right: 20px;
    padding-bottom: 20px;
  }
  .select__file {
    width: 25vw;
    max-width: 300px;
  }
  .button__submit__file {
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 1200px) {
  #add__post {
    width: 95vw;
    .select__file {
      margin: auto;
      width: 90vw;
    }
  }
}
</style>
