<template>
  <!--Bouton "Profil"-->
  <div id="profile__button">
    <div class="profile__button__picture">
      <img :src="user.pictureUrl" alt="Photo de profil" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProfileButton",
  mounted: function () {
    /**
     * Si l'utilisateur n'est pas log, retour forcé à la page login/signup
     */
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
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
#profile__button {
  width: 50px;
  cursor: pointer;

  .profile__button__picture {
    //background-image: url("@/assets/profile-picture.png");
    img {
      height: 50px;
      width: 50px;
      background-size: cover;
      background-position: center;
      border-radius: 50px;
    }
  }
}

@media screen and (max-width: 1200px) {
  #profile__button {
    width: 40px;

    .profile__button__picture {
      height: 40px;
      width: 40px;
    }
  }
}
</style>
