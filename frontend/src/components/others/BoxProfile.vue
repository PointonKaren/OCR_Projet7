<template>
  <div id="profile">
    <!-- <p>Prénom{{ user.firstName }} Nom{{ user.surname }}</p> -->
    <img
      src="@/assets/profile-picture.png"
      alt="Photo de profil"
      class="profile__picture"
    />
    <!-- <p>jobTitle {{ user.jobTitle }}</p> -->
    <!-- <p>bio {{ user.bio }}</p> -->
    <p class="profile__modify__account">Modifier mon compte</p>
    <p class="profile__delete__account">Supprimer mon compte</p>
  </div>
</template>

<script>
export default {
  name: "BoxProfile",
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
};
</script>

<style lang="scss">
#profile {
  width: 40vw;
  max-width: 600px;
  margin: auto;
  padding-left: 20px;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  margin-bottom: 30px;
  .profile__picture {
    border: 2px solid #091f43;
  }
}
</style>
