<template>
  <div id="home">
    <BoxPresentation class="presentation" />
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

    <!-- mettre les 3 box au dessus dans une div, v-if si let isLog = false, v-else si let isLog = true -->

    <!-- <DetailPost /> -->
    <!-- <PostsCascade /> -->
  </div>
</template>

<script>
import BoxPresentation from "../components/others/BoxPresentation.vue";
import BoxSignup from "../components/others/BoxSignup.vue";
import BoxLogin from "../components/others/BoxLogin.vue";
// import DetailPost from "../components/posts/DetailPost.vue";
// import PostsCascade from "../components/posts/PostsCascade.vue";
export default {
  name: "ViewHome",
  components: {
    BoxPresentation,
    BoxSignup,
    BoxLogin,
    // DetailPost,
    // PostsCascade,
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
  #create {
    display: flex;
    flex-direction: column;
    .login {
      margin: auto;
      margin-top: 40px;
      margin-bottom: 40px;
      font-size: 1.3em;
    }
  }
  #login {
    display: flex;
    flex-direction: column;
    .signup {
      margin: auto;
      margin-top: 40px;
      margin-bottom: 40px;
      font-size: 1.3em;
    }
  }
  @media screen and (max-width: 1200px) {
    .presentation {
      display: none;
    }
    #create {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .login {
        font-size: 1.3em;
        margin-bottom: -10px;
      }
    }
    #login {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .signup {
        font-size: 1.3em;
      }
    }
  }
}
</style>
