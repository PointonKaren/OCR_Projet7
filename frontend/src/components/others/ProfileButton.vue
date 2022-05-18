<template>
  <!--Bouton "Profil"-->
  <div id="profile__button">
    <div class="profile__button__picture"></div>
    <div class="profile__buttons">
      <!-- <button class="button logout">Me déconnecter</button>
      <button class="button delete__account">Supprimer mon compte</button> -->
    </div>
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
    width: 35px;
    .profile__button__picture {
      height: 35px;
      width: 35px;
    }
  }
}
</style>
