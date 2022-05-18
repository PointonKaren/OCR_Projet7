<template>
  <!--Bouton "Profil"-->
  <div id="profile__button">
    <div class="profile__button__picture"></div>
  </div>
</template>

<script>
export default {
  name: "ProfileButton",
};
</script>

<style lang="scss">
#profile__button {
  width: 50px;
  .profile__button__picture {
    background-image: url("@/assets/profile-picture.png");
    height: 50px;
    width: 50px;
    background-size: cover;
    background-position: center;
    border-radius: 50px;
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
