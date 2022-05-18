<template>
  <div id="profile">
    <img
      src="@/assets/profile-picture.png"
      alt="Photo de profil"
      class="profile__picture"
    />
    <div class="profile__datas">
      <p class="profile__firsName">Prénom</p>
      <!-- <p>{{ user.firstName }}</p> -->
      <p class="profile__surname">Nom</p>
      <!-- <p>{{ user.surname }}</p> -->
      <p class="profile__jobtitle">jobTitle</p>
      <!-- <p>{{ user.jobTitle }}</p> -->
      <!-- <p>bio {{ user.bio }}</p> -->
      <div class="profile__setup">
        <p class="profile__modify__account">Modifier mon compte</p>
        <p class="profile__delete__account">Supprimer mon compte</p>
      </div>
    </div>
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
    // this.$store.dispatch("getUserInfos");
  },
};
</script>

<style lang="scss">
#profile {
  display: flex;
  justify-content: space-between;
  width: 40vw;
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  margin-bottom: 30px;
  .profile__picture {
    border: 2px solid #091f43;
  }
}
</style>
