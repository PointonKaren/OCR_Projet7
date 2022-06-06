<template>
  <!--Bouton "Profil"-->
  <div class="profile__button" v-bind:class="isVisible">
    <img :src="user.pictureUrl" alt="Photo de profil" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProfileButton",
  data() {
    return {
      isVisible: "invisible",
    };
  },

  beforeMount() {
    this.checkLogin();
  },

  methods: {
    /**
     * Si l'utilisateur n'est pas log, retour forcé à la page login/signup
     */
    checkLogin() {
      if (this.$store.state.user.userId == -1) {
        this.$router.push("/");
        this.isVisible = "invisible";
        return;
      } else {
        this.isVisible = "visible";
      }
      this.$store.dispatch("getUserInfos");
    },
  },

  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

.profile__button {
  margin-top: 6px;
  cursor: pointer;
  img {
    border: 2px solid $primaire;
    height: 60px;
    width: 60px;
    border-radius: 50px;
  }
}

.visible {
  display: inline;
}
.invisible {
  display: none;
}

@media screen and (max-width: 1200px) {
  .profile__button {
    img {
      height: 35px;
      width: 35px;
    }
  }
}
</style>
