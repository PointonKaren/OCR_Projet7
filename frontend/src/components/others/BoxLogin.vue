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
export default {
  name: "BoxLogin",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    login: function () {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
        }),
        function (error) {
          console.log(error);
        };
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
    }
  }
}
</style>
