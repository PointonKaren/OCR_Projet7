<template>
  <div id="profile">
    <img
      src="@/assets/profile-picture.png"
      alt="Photo de profil"
      class="profile__picture"
    />
    <div class="profile__datas">
      <button
        aria-label="Modifier le profil"
        class="button edit profile__edit__button"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <p class="profile__name">Prénom Nom</p>
      <!-- <p>{{ user.firstName }} {{ user.surname }}</p> -->
      <p class="profile__jobtitle">jobTitle</p>
      <!-- <p>{{ user.jobTitle }}</p> -->
      <p class="profile__bio">
        Bio : Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Mollitia, voluptatibus dolore voluptas id fugiat amet doloremque veniam
        labore ut quae.
      </p>
      <!-- <p>bio {{ user.bio }}</p> -->
      <p class="profile__logout">Se déconnecter</p>
      <p class="profile__delete__account">Supprimer mon compte</p>
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
  z-index: 2;
  position: absolute;
  right: 40px;
  top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40vw;
  max-width: 500px;
  padding: 20px;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  .profile__picture {
    border: 2px solid #091f43;
  }
  .profile__datas {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    .profile__edit__button {
      position: absolute;
      align-self: flex-end;
    }
  }
}
@media screen and (max-width: 1200px) {
  #profile {
    right: 7px;
    top: 18vh;
    width: 85vw;
    padding: 0;
    padding: 15px;
    img {
      width: 25vw;
      height: 15vh;
    }
    .profile__datas {
      .profile__edit__button {
        align-self: flex-end;
      }
    }
  }
}
</style>
