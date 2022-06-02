<template>
  <!--Bloc "Création de publication" -->
  <div id="add__post">
    <h2 class="add__post__title">Importer une image</h2>
    <form id="add__post__form" @submit.prevent="uploadPost()">
      <div id="add__post__title">
        <label for="title">Titre de la publication :</label>
        <input
          type="text"
          placeholder="Ecrire un titre"
          name="title"
          v-model="title"
          required
        />
      </div>
      <div id="add__post__file">
        <label>Sélectionner un fichier : </label>
        <input
          ref="file"
          type="file"
          class="select__file"
          accept="image/*"
          required
          @change="uploadImage"
        />
      </div>
      <input
        type="submit"
        value="Envoyer"
        aria-label="Envoyer le fichier"
        class="button button__submit__file"
      />
    </form>
  </div>
</template>

<script>
// import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "AddPost",

  data: function () {
    return {
      title: "",
      pictureUrl: "",
    };
  },

  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  methods: {
    uploadImage: function (e) {
      this.pictureUrl = e.target.files[0];
    },

    uploadPost: function () {
      const formData = new FormData();

      const postData = {
        title: this.title,
      };

      formData.append("image", this.pictureUrl);

      this.$store.dispatch("addPost", {
        postData,
        formData,
      });

      // reload page
      window.location.reload();
    },
  },
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
  #add__post__form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 11vh;
    #add__post__title {
      margin: auto;
    }
    #add__post__file {
      margin: auto;
    }
    label {
      padding-right: 20px;
      padding-bottom: 20px;
    }
    .button__submit__file {
      width: 150px;
      align-self: center;
      margin-bottom: 15px;
    }
  }
}
@media screen and (max-width: 1200px) {
  #add__post {
    width: 95vw;
    #add__post__form {
      padding-left: 10px;
      .select__file {
        margin: auto;
        width: 100vw;
      }
    }
  }
}
</style>
