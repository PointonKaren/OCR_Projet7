<template>
  <!--Bouton "Profil"-->
  <div class="profile__button__picture" v-bind:class="isVisible">
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

  mounted: function () {
    /**
     * Si l'utilisateur n'est pas log, retour forcé à la page login/signup
     */
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      this.isVisible = "invisible";
      return;
    } else {
      this.isVisible = "visible";
    }
    this.$store.dispatch("getUserInfos");
  },

  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
};
</script>

<style lang="scss">
.profile__button__picture {
  margin-top: 6px;
  cursor: pointer;
  img {
    border: 2px solid #091f43;
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
  .profile__button__picture {
    img {
      height: 35px;
      width: 35px;
    }
  }
}
</style>
