<template>
  <!--Bloc "Création de publication" -->
  <div id="add__post">
    <h2 class="add__post__title">Importer une image</h2>
    <form id="add__post__form" @submit.prevent="uploadPost()">
      <div id="add__post__form__title">
        <label for="title">Titre de la publication :</label>
        <input
          type="text"
          placeholder="Ecrire un titre"
          name="title"
          class="add__post__form__title__input"
          v-model="title"
          required
        />
      </div>
      <div id="add__post__form__file">
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

      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

#add__post {
  background-color: $background;
  border: 2px solid $primaire;
  color: $primaire;
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
    height: 150px;
    width: 30vw;
    max-width: 900px;
    margin-bottom: 15px;
    #add__post__form__title {
      margin: auto;
    }
    #add__post__form__file {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20vw;
      max-width: 350px;
      margin: auto;
      justify-content: center;
    }
    label {
      padding-right: 20px;
      padding-bottom: 20px;
    }
    .button__submit__file {
      width: 150px;
      align-self: center;
    }
  }
}
@media screen and (max-width: 1200px) {
  #add__post {
    width: 95vw;
    height: 60vh;
    .add__post__title {
      margin: 0;
      margin-top: 15px;
    }
    #add__post__form {
      width: 90vw;
      height: 50vh;

      #add__post__form__title {
        display: flex;
        flex-direction: column;
        width: 90vw;
        max-width: 900px;
        align-items: center;
        .add__post__form__title__input {
          width: 85vw;
          max-width: 350px;
        }
      }
      #add__post__form__file {
        width: 90vw;
        margin: auto;
        .select__file {
          margin: auto;
        }
      }
      label {
        padding: 0;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .button__submit__file {
        margin-top: 10px;
        width: 150px;
        align-self: center;
      }
    }
  }
}
</style>
