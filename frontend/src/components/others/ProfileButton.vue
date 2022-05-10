<template>
  <!--Bouton "Profil"-->
  <div id="profile">
    <div class="profile__picture"></div>
    <div id="profile__buttons">
      <!-- <button class="button logout">Me déconnecter</button>
      <button class="button delete__account">Supprimer mon compte</button> -->
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
#profile {
  width: 50px;
  .profile__picture {
    background-image: url("https://www.handiclubnimois.fr/wp-content/uploads/2020/10/blank-profile-picture-973460_1280.png");
    height: 50px;
    width: 50px;
    background-size: cover;
    background-position: center;
    border-radius: 50px;
  }
}
</style>
