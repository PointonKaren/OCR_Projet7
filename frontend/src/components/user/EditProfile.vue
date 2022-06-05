<template>
  <!--Bloc "Modifier le profil"-->
  <div id="edit__profile">
    <h2>Modifier le profil</h2>
    <form id="form" @submit.prevent="editAccount()">
      <div class="edit__name">
        <p>
          <label for="firstName">Prénom :</label>
          <br />
          <input
            class="input"
            type="text"
            name="firstName"
            id="firstName"
            v-model="firstName"
          />
        </p>
        <p>
          <label for="lastName">Nom :</label>
          <br />
          <input
            class="input"
            type="text"
            name="lastName"
            id="lastName"
            v-model="lastName"
          />
        </p>
      </div>
      <div class="edit__logdatas">
        <p>
          <label for="email">Mail professionnel :</label>
          <br />
          <input
            class="input"
            type="email"
            name="email"
            id="email"
            pattern=".+@groupomania\.com"
            v-model="email"
          />
        </p>
        <p class="password__field">
          <label for="password">Mot de passe :</label>
          <br />
          <input
            class="input"
            :type="text"
            name="password"
            id="password"
            title="Minimun 8 caractères, 1 majuscule, 1
        minuscule et 2 chiffres."
          />
        </p>
      </div>
      <div class="edit__optional">
        <p class="edit__jobtitle">
          <label for="jobTitle">Intitulé de poste :</label>
          <input
            class="input"
            type="text"
            name="jobTitle"
            id="jobTitle"
            v-model="jobTitle"
          />
        </p>
        <p class="edit__picture">
          <label for="picture">Photo de profil :</label>
          <input
            type="file"
            accept="image/*"
            name="pictureUrl"
            id="pictureUrl"
            @change="uploadImage"
          />
        </p>
        <p class="edit__bio">
          <label for="bio">Présentation rapide :</label>
          <textarea
            class="edit__profile__textarea"
            type="text"
            name="bio"
            id="bio"
            v-model="bio"
          ></textarea>
        </p>
      </div>
      <input
        type="submit"
        value="Envoyer"
        class="button send"
        :class="{ 'button--disabled': !validatedFields }"
      />
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SignupForm",

  data: function () {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      jobTitle: "",
      bio: "",
      pictureUrl: "",
      show: false,
    };
  },

  computed: {
    /**
     * Si les champs obligatoires sont remplis, renvoyer true (valide le formulaire)
     */
    validatedFields: function () {
      if (
        this.firstName != "" ||
        this.lastName != "" ||
        this.email != "" ||
        this.password != "" ||
        this.jobTitle != "" ||
        this.bio != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
    ...mapState({
      user: "userInfos",
    }),
  },

  methods: {
    /**
     * Récupérer l'image upload par l'utilisateur
     */
    uploadImage: function (e) {
      this.pictureUrl = e.target.files[0];
    },

    /**
     * Modifier un compte
     */
    editAccount: function () {
      // Ajoute au store vuex les données entrées par l'utilisateur

      var formData = new FormData();

      let containImage = false;

      if (this.pictureUrl) {
        formData.append("image", this.pictureUrl);
        containImage = true;
      }

      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        jobTitle: this.jobTitle,
        bio: this.bio,
      };

      this.$store
        .dispatch("updateUserInfos", { containImage, formData, userData })
        .then(function () {
          // On rafraichit la page pour afficher les modifications
          window.location.reload();
        }),
        function (error) {
          console.log(error);
        };
    },
  },

  mounted: function () {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
    this.jobTitle = this.user.jobTitle;
    this.bio = this.user.bio;
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

#edit__profile {
  z-index: 2;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 40px;
  top: 200px;
  background-color: $background;
  border: 2px solid $primaire;
  border-top: none;
  width: 20vw;
  max-width: 500px;
  padding: 20px;
  h2 {
    text-align: center;
    margin: 0;
  }
  #form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-width: 500px;

    .edit__name,
    .edit__logdatas,
    .edit__jobtitle,
    .edit__bio {
      .input {
        text-align: center;
        height: 3vh;
        max-height: 20px;
        border: 1px solid $tertiaire;
        padding-left: 5px;
        border-radius: 8px;
        &:focus {
          @include focus;
        }
      }
    }
    .edit__name,
    .edit__logdatas {
      text-align: center;
    }
    .edit__name {
      width: 7vw;
      .input {
        width: 6vw;
      }
    }
    .edit__logdatas {
      width: 11vw;
      .input {
        width: 10vw;
      }
      .password__field {
        .input {
          width: 6vw;
        }
      }
    }
    .edit__optional {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .edit__jobtitle,
      .edit__bio {
        display: flex;
        flex-wrap: wrap;
        label {
          margin: auto;
          margin-bottom: 10px;
        }
        .input {
          width: 100%;
        }
      }
      .edit__picture {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .edit__bio {
        .edit__profile__textarea {
          width: 18vw;
          height: 10vh;
          margin: auto;
          resize: none;
          border: 1px solid $tertiaire;
          padding-top: 8px;
          padding-left: 8px;
          border-radius: 10px;
          &:focus {
            @include focus;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  #edit__profile {
    right: 7px;
    top: 180px;
    width: 85vw;
    padding: 0;
    padding: 15px;
    #form {
      padding: 0;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
      margin: 0;
      .edit__name {
        width: 80vw;
        max-width: 250px;
        .input {
          width: 80%;
          max-width: 250px;
        }
      }
      .edit__logdatas {
        width: 80vw;
        max-width: 250px;
        .input {
          width: 100%;
          max-width: 390px;
        }
        .password__field {
          .input {
            width: 80%;
          }
        }
      }
      .edit__optional {
        width: 80vw;
        max-width: 450px;

        .edit__picture {
          width: 80vw;
          label {
            margin-bottom: 10px;
          }
          input {
            width: 80vw;
            max-width: 300px;
          }
        }
        .edit__bio {
          width: 80vw;
          max-width: 500px;
          flex-direction: column;
          justify-content: center;
          margin: 0;
          .edit__profile__textarea {
            width: 90%;
            max-width: 320px;
            height: 20vh;
            margin-bottom: 10px;
          }
        }
      }
      .send {
        width: 35vw;
        max-width: 100px;
        margin: auto;
      }
    }
  }
}
</style>
