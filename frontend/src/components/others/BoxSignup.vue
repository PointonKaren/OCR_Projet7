<template>
  <!--Bloc "Signup"-->
  <div id="signup">
    <h1>Inscription</h1>
    <div class="form">
      <p>
        <label for="firstName">Prénom : </label>
        <input
          class="input"
          type="text"
          name="firstName"
          id="firstName"
          required
          v-model="firstName"
        />
      </p>
      <p>
        <label for="surname">Nom : </label>
        <input
          class="input"
          type="text"
          name="surname"
          id="surname"
          required
          v-model="surname"
        />
      </p>
      <p>
        <label for="email">Mail professionnel : </label>
        <input
          class="input"
          type="email"
          name="email"
          id="email"
          placeholder="prenom.nom@groupomania.com"
          pattern=".+@groupomania\.com"
          required
          v-model="email"
        />
      </p>
      <p>
        <label for="password">Mot de passe : </label>
        <input
          class="input"
          type="password"
          name="password"
          id="password"
          required
          title="Minimun 8 caractères, 1 majuscule, 1
        minuscule et 2 chiffres."
          v-model="password"
        />
      </p>
      <div v-if="status == 'error_create'">Adresse mail déjà utilisée.</div>
      <input
        type="submit"
        value="Envoyer"
        class="button send"
        :class="{ 'button--disabled': !validatedFields }"
        @click="createAccount()"
      />
      <!-- <span v-if="status == 'loading'">Enregistrement en cours...</span>
      <span v-else>Connexion</span> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BoxSignup",
  data: function () {
    return {
      firstName: "",
      surname: "",
      email: "",
      password: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (
        this.firstName != "" &&
        this.surname != "" &&
        this.email != "" &&
        this.password != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    createAccount: function () {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          firstName: this.firstName,
          surname: this.surname,
          email: this.email,
          password: this.password,
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
#signup {
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
    }
  }
}
</style>
