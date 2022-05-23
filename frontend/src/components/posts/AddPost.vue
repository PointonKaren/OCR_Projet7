<template>
  <!--Bloc "Création de publication" -->
  <div id="add__post">
    <div>
      <h2>Single File</h2>
      <hr />
      <label
        >File
        <input type="file" @change="handleFileUpload($event)" />
      </label>
      <br />
      <button v-on:click="submitFile()">Submit</button>
    </div>
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
  width: 400px;
  margin: auto;
  label {
    padding-right: 20px;
  }
}
</style>
