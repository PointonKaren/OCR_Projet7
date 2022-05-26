<template>
  <!--Header une fois connecté-->
  <header>
    <div id="header">
      <img :src="require('@/assets/logo.png')" alt="Logo de Groupomania" />
      <div id="header__buttons">
        <ProfileButton @click="toggle" />
        <a href="mailto:admin@groupomania.com" title="contact"
          ><button aria-label="Contact" class="button contact">Contact</button>
          <button aria-label="Contact" class="button contact__icon">
            <i class="fa-regular fa-envelope"></i>
          </button>
        </a>
      </div>
    </div>
    <!-- Apparition progressive du profil au clic sur le bouton -->
    <Transition>
      <div v-if="profile_is_here">
        <BoxProfile />
      </div>
    </Transition>
  </header>
</template>

<script>
import ProfileButton from "../user/ProfileButton.vue";
import BoxProfile from "../user/BoxProfile.vue";
import { mapState } from "vuex";

export default {
  name: "BoxHeaderLogged",

  components: {
    ProfileButton,
    BoxProfile,
  },

  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  /**
   * Par défaut, le profil utilisateur n'est pas visible
   */
  data() {
    return {
      profile_is_here: false,
    };
  },

  /**
   * Bascule le profil de visible à non visible
   */
  methods: {
    toggle() {
      this.profile_is_here = !this.profile_is_here;
    },
  },
};
</script>

<style scoped lang="scss">
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 3px solid #d1515a;
  background-color: lightgrey;
  img {
    margin-left: 20px;
  }
  #header__buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 190px;
    height: 60px;
    margin-right: 20px;
    a {
      .contact {
        font-size: 1.3em;
      }
      .contact__icon {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  #header {
    padding-left: 0;
    padding-right: 0;
    img {
      width: 40vw;
    }
    #header__buttons {
      width: 30vw;
      max-width: 100px;
      a {
        .contact {
          display: none;
        }
        .contact__icon {
          border-radius: 50px;
          padding-right: 9px;
          display: inline;
        }
      }
    }
  }
}
</style>
