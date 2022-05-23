<template>
  <!--Bloc "Login"-->
  <div id="login_form">
    <h1>Connexion</h1>
    <div class="form">
      <p>
        <label for="email">Mail professionnel : </label>
        <input
          class="input email"
          type="email"
          name="email"
          id="email"
          placeholder="prenom.nom@groupomania.com"
          pattern=".+@groupomania\.com"
          required
          v-model="email"
        />
      </p>
      <p id="password__field">
        <label for="password">Mot de passe : </label>
        <input
          class="input"
          :type="show ? 'text' : 'password'"
          name="password"
          id="password"
          required
          title="Minimun 8 caractères, 1 majuscule, 1
        minuscule et 2 chiffres."
          v-model="password"
        />
        <button class="button show_password" @click="show = !show">
          <i class="fa-regular fa-eye" v-show="!show"></i>
          <i class="fa-regular fa-eye-slash" v-show="show"></i>
        </button>
      </p>
      <div v-if="status == 'error_login'">
        Adresse mail et/ou mot de passe invalide.
      </div>
      <input
        type="submit"
        value="Envoyer"
        class="button send"
        :class="{ 'button--disabled': !validatedFields }"
        @click="login()"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BoxLogin",

  data: function () {
    return {
      email: "",
      password: "",
      show: false,
    };
  },

  mounted: function () {
    /**
     * Si l'utilisateur est log -> redirection vers la cascade de publications
     */
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/post");
      return;
    }
  },

  computed: {
    /**
     * Si le mail et le mot de passe ne sont pas identiques aux attentes, login refusé
     */
    validatedFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
  },

  methods: {
    /**
     * Fonction de login
     */
    login: function () {
      const self = this;
      this.$store
        // Ajout au store vuex du mail et du mdp utilisateur
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            // Redirection de l'utilisateur sur la cascade de publications
            self.$router.push("/post");
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style lang="scss">
#login_form {
  width: 40vw;
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
      font-size: 1.3em;
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
  #login_form {
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
