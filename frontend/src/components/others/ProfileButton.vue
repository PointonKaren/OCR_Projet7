<template>
  <!--Bouton "Profil"-->
  <div id="profile__button">
    <div class="profile__button__picture"></div>
    <div class="profile__buttons">
      <!-- <button class="button logout">Me déconnecter</button>
      <button class="button delete__account">Supprimer mon compte</button> -->
      <p class="my__profile">Mon profil</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileButton",
};
// const profile = document.getElementById("profile");
// const profileButtons = document.getElementById("profile__button");

// const openBox = () => {
//   profileButtons.style.display = "block";
// };

// const closeBox = () => {
//   profileButtons.style.display = "none";
// };
// const addProfileEvents = () => {
//   profile.addEventListener("click", () => {
//     openBox();
//   });

//   profile.addEventListener("click", () => {
//     closeBox();
//   });
// };
// addProfileEvents();
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
</style>
