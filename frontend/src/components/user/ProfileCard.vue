<template>
  <div id="profile">
    <div class="profile__datas">
      <button
        aria-label="Modifier le profil"
        class="button edit profile__edit__button"
        @click="toggle"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <!-- Infos utilisateur dynamiques -->
      <p class="profile__name">
        {{ user.firstName }}
        {{ user.lastName }}
      </p>
      <p class="profile__jobtitle">Intitulé de poste : {{ user.jobTitle }}</p>
      <!-- <p class="profile__bio">
        Bio : Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Mollitia, voluptatibus dolore voluptas id fugiat amet doloremque
        veniam labore ut quae.
      </p> -->
      <p class="profile__bio">Bio : {{ user.bio }}</p>
      <p class="profile__logout" @click="logout()">Se déconnecter</p>
      <p class="profile__delete__account" @click="deleteAccount()">
        Supprimer mon compte
      </p>
    </div>
    <img
      :src="user.pictureUrl"
      alt="Photo de profil"
      class="profile__picture"
    />
    <!-- <img
      src="@/assets/profile-picture.png"
      alt="Photo de profil"
      class="profile__picture"
    /> -->
    <Transition>
      <div v-if="edit_profile_is_here">
        <EditProfile />
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditProfile from "./EditProfile.vue";

export default {
  name: "ProfileCard",
  components: {
    EditProfile,
  },
  data() {
    return {
      edit_profile_is_here: false,
    };
  },

  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  methods: {
    /**
     * Quand l'utilisateur se delog, retour à la page login/signup
     */
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },

    /**
     * Fonction delete account
     */
    deleteAccount: function () {
      const self = this;

      this.$store
        .dispatch("deleteAccount")
        .then(function (response) {
          if (response.success) {
            self.$router.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toggle() {
      this.edit_profile_is_here = !this.edit_profile_is_here;
    },
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
  flex-direction: column;
  align-items: center;
  width: 20vw;
  max-width: 500px;
  padding: 20px;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  .profile__datas {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    .profile__edit__button {
      position: absolute;
      align-self: flex-end;
    }
    .profile__logout,
    .profile__delete__account {
      cursor: pointer;
    }
  }
  .profile__picture {
    border: 2px solid #091f43;
    max-width: 200px;
  }
}
@media screen and (max-width: 1200px) {
  #profile {
    right: 7px;
    top: 18vh;
    width: 85vw;
    padding: 0;
    padding: 15px;
    .profile__datas {
      .profile__edit__button {
        align-self: flex-end;
      }
    }
    .profile__picture {
      width: 40vw;
      max-width: 150px;
    }
  }
}
</style>
