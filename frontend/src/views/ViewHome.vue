<template>
  <div id="home">
    <BoxHeader />
    <BoxPresentation />
    <div id="create" v-if="mode == 'create'">
      <button
        aria-label="Me connecter"
        class="button login"
        @click="switchToLogin()"
      >
        Me connecter
      </button>
      <SignupForm />
    </div>
    <div id="login" v-else>
      <button
        aria-label="M'enregistrer"
        class="button signup"
        @click="switchToCreateAccount()"
      >
        M'enregistrer
      </button>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import BoxHeader from "../components/others/BoxHeader.vue";
import BoxPresentation from "../components/others/BoxPresentation.vue";
import SignupForm from "../components/user/SignupForm.vue";
import LoginForm from "../components/user/LoginForm.vue";
export default {
  name: "ViewHome",
  components: {
    BoxHeader,
    BoxPresentation,
    SignupForm,
    LoginForm,
  },
  data: function () {
    return {
      mode: "login",
    };
  },

  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
  },
};
</script>

<style lang="scss">
#home {
  #create,
  #login {
    display: flex;
    flex-direction: column;
    .login,
    .signup {
      margin: auto;
      margin-top: 40px;
      margin-bottom: 40px;
      font-size: 1.3em;
    }
  }
  @media screen and (max-width: 1200px) {
    #home {
      #create,
      #login {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .login,
        .signup {
          font-size: 1.3em;
          margin-bottom: -10px;
        }
      }
    }
  }
}
</style>
