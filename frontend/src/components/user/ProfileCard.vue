<template>
  <div id="profile__card">
    <div id="profile">
      <div class="profile__datas">
        <div class="profile__buttons">
          <button
            aria-label="Modifier le profil"
            class="button edit profile__edit__button"
            @click="toggle"
          >
            <i class="fa-regular fa-pen-to-square"></i>
          </button>

          <button class="button profile__logout__button" @click="logout()">
            Se déconnecter
          </button>
          <button
            class="button profile__logout__button__icon"
            @click="logout()"
          >
            <i class="fa-solid fa-right-to-bracket"></i>
          </button>
        </div>
        <!-- Infos utilisateur dynamiques -->
        <p class="profile__name">
          {{ user.firstName }}
          {{ user.lastName }}
        </p>
        <p class="profile__jobtitle">
          <b>Intitulé de poste :</b> {{ user.jobTitle }}
        </p>
        <p class="profile__bio"><b>Bio :</b> {{ user.bio }}</p>
      </div>
      <img
        :src="user.pictureUrl"
        alt="Photo de profil"
        class="profile__picture"
      />
      <div class="delete__button">
        <button
          class="button profile__delete__account"
          @click="deleteConfirm()"
        >
          Supprimer mon compte
        </button>
        <confirm-dialogue
          ref="confirmDialogue"
          class="delete__popup"
        ></confirm-dialogue>
      </div>
    </div>
    <Transition>
      <EditProfile v-if="edit_profile_is_here" />
    </Transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditProfile from "./EditProfile.vue";
import ConfirmDialogue from "../others/ConfirmDialogue.vue";

export default {
  name: "ProfileCard",
  components: {
    EditProfile,
    ConfirmDialogue,
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
     * Demande de confirmation avant suppression
     */
    async deleteConfirm() {
      const ok = await this.$refs.confirmDialogue.show({
        title: "Supprimer le compte",
        message:
          "Êtes vous certain(e) de vouloir supprimer votre compte ? \n Cette action est irréversible.",
        okButton: "Confirmer",
      });
      if (ok) {
        //* Fonction de suppression de compte :
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
        alert("Le compte a été supprimé");
      } else {
        alert("Le compte n'a pas été supprimé");
      }
    },

    toggle() {
      this.edit_profile_is_here = !this.edit_profile_is_here;
    },
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

#profile__card {
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
    background-color: $background;
    border: 2px solid $primaire;
    .profile__datas {
      width: 90%;
      display: flex;
      flex-direction: column;
      padding-left: 15px;
      .profile__buttons {
        align-self: flex-end;
        .profile__edit__button {
          margin-right: 20px;
        }
        .profile__logout__button__icon {
          display: none;
        }
      }
      .profile__name {
        font-weight: bold;
        font-size: 1.2em;
      }
    }
    .profile__picture {
      border: 2px solid $primaire;
      max-width: 200px;
    }
    .delete__button {
      height: 60px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .profile__delete__account {
        color: $tertiaire;
        font-weight: bold;
        border: 1px solid $tertiaire;
      }
      p {
        margin: 0;
        color: $tertiaire;
        font-size: 1.2em;
        font-weight: bold;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  #profile__card {
    #profile {
      right: 7px;
      top: 18vh;
      width: 85vw;
      padding: 0;
      padding: 15px;
      .profile__datas {
        .profile__buttons {
          .profile__edit__button {
            align-self: flex-end;
          }
          .profile__logout__button {
            display: none;
          }
          .profile__logout__button__icon {
            display: inline;
            border-radius: 50px;
          }
        }
      }
      .profile__picture {
        width: 40vw;
        max-width: 150px;
      }
    }
  }
}
</style>
