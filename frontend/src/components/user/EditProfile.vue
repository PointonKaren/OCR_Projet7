<template>
  <!--Bloc "Modifier le profil"-->
  <div id="edit__profile">
    <h2>Modifier le profil</h2>
    <div class="form">
      <p>
        <label for="firstName">Prénom : </label>
        <input
          class="input"
          type="text"
          name="firstName"
          id="firstName"
          v-model="firstName"
        />
      </p>

      <p>
        <label for="lastName">Nom : </label>
        <input
          class="input"
          type="text"
          name="lastName"
          id="lastName"
          v-model="lastName"
        />
      </p>
      <p>
        <label for="email">Mail professionnel : </label>
        <input
          class="input"
          type="email"
          name="email"
          id="email"
          pattern=".+@groupomania\.com"
          v-model="email"
        />
      </p>
      <p id="password__field">
        <label for="password">Mot de passe : </label>
        <input
          class="input"
          :type="show ? 'password' : 'text'"
          name="password"
          id="password"
          title="Minimun 8 caractères, 1 majuscule, 1
        minuscule et 2 chiffres."
          v-model="password"
        />
        <button class="button show_password" @click="show = !show">
          <i class="fa-regular fa-eye" v-show="!show"></i>
          <i class="fa-regular fa-eye-slash" v-show="show"></i>
        </button>
      </p>
      <p>
        <label for="jobTitle">Intitulé de poste : </label>
        <input
          class="input"
          type="text"
          name="jobTitle"
          id="jobTitle"
          v-model="jobTitle"
        />
      </p>
      <p>
        <label for="jobTitle">Présentation rapide :</label>
        <textarea
          class="input"
          type="text"
          name="Bio"
          id="Bio"
          v-model="Bio"
        ></textarea>
      </p>
      <p id="picture__field">
        <label for="picture">Photo de profil </label>
        <input type="file" accept="image/*" name="pictureUrl" id="pictureUrl" />
      </p>
      <input
        type="submit"
        value="Envoyer"
        class="button send"
        :class="{ 'button--disabled': !validatedFields }"
        @click="editAccount()"
      />
    </div>
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
      Bio: "",
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
        this.Bio != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
  },

  methods: {
    /**
     * Créer un compte
     */
    editAccount: function () {
      // Ajoute au store vuex les données entrées par l'utilisateur et le redirige vers la cascade de publications
      const self = this;
      this.$store
        .dispatch("editAccount", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          jobTitle: this.jobTitle,
          Bio: this.Bio,
        })
        .then(function () {
          self.$router.push("/post");
        }),
        function (error) {
          console.log(error);
        };
    },
  },
};
</script>

<style lang="scss">
#edit__profile {
  width: 35vw;
  max-width: 600px;
  margin: auto;
  padding-left: 20px;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  margin-bottom: 30px;
  h1 {
    text-align: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 1.1em;
      label {
        display: block;
        text-align: center;
        margin-bottom: 20px;
      }

      .input {
        width: 25vw;
        max-width: 300px;
        text-align: center;
        &::placeholder {
          font-size: 0.9em;
        }
      }
    }
    .send {
      margin: 0;
      margin-bottom: 20px;
      align-self: center;
      padding-right: 15px;
      padding-left: 15px;
      font-size: 1.3em;
    }
    .button--disabled {
      background-color: grey;
      color: lightgrey;
      border: 1px solid darkgrey;
    }
    #password__field {
      #password {
        margin-right: 5px;
        width: 250px;
      }
      .show_password {
        border-radius: 0;
        font-size: 0.75em;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  #signup {
    margin-top: 30px;
    padding: 0;
    width: 90vw;
    h1 {
      font-size: 1.3em;
    }
    .form {
      margin: 0;
      p {
        margin: 0;
        font-size: 1em;
        label {
          margin: 0;
          margin-bottom: 10px;
          margin-top: 10px;
        }
        .input {
          width: 80vw;
        }
      }
      .send {
        margin-top: 20px;
        font-size: 1em;
      }
      #password__field {
        #password {
          width: 70vw;
        }
        .show_password {
          border-radius: 0;
          font-size: 0.7em;
          padding: 6px;
        }
      }
    }
  }
}
</style>
