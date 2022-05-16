<template>
  <div id="home">
    <BoxPresentation />
    <div id="create" v-if="mode == 'create'">
      <button class="button login" @click="switchToLogin()">
        Me connecter
      </button>
      <BoxSignup />
    </div>
    <div id="login" v-else>
      <button class="button signup" @click="switchToCreateAccount()">
        M'enregistrer
      </button>
      <BoxLogin />
    </div>
  </div>
</template>

<script>
import BoxPresentation from "../components/others/BoxPresentation.vue";
import BoxSignup from "../components/others/BoxSignup.vue";
import BoxLogin from "../components/others/BoxLogin.vue";
export default {
  name: "ViewHome",
  components: {
    BoxPresentation,
    BoxSignup,
    BoxLogin,
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
  margin-top: 30px;
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
// TODO: Afficher les messages d'erreurs générés par le back. backend\controllers\user.js pour le mail et backend\utils\common.js pour le mdp. Cf P6
// TODO: https://www.youtube.com/watch?v=W2ZWbE45vkg
</style>
