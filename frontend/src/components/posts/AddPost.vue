<template>
  <!--Bloc "Création de publication" -->
  <div id="add__post">
    <h2 class="add__post__title">Importer une image</h2>
    <label>Sélectionner un fichier : </label>
    <input
      class="select__file"
      type="file"
      accept="image/*"
      @change="handleFileUpload($event)"
    />
    <br />
    <button
      aria-label="Envoyer le fichier"
      class="button button__submit__file"
      v-on:click="submitFile()"
    >
      Envoyer
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddPost",

  data() {
    return {
      file: "",
    };
  },

  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    /**
     * Créer une publication
     */
    submitFile() {
      let formData = new FormData();

      formData.append("file", this.file);

      axios
        .post("http://localhost:3000/api/post/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
  },
};
</script>

<style lang="scss">
#add__post {
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
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
