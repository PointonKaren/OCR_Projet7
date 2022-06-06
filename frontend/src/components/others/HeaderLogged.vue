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
        <ProfileCard />
      </div>
    </Transition>
  </header>
</template>

<script>
import ProfileButton from "../user/ProfileButton.vue";
import ProfileCard from "../user/ProfileCard.vue";
import { mapState } from "vuex";

export default {
  name: "HeaderLogged",

  components: {
    ProfileButton,
    ProfileCard,
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
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 3px solid $tertiaire;
  background-color: lightgrey;
  img {
    margin-left: 20px;
  }
  #header__buttons {
    margin-right: 20px;
    width: 250px;
  }
}

@media screen and (max-width: 1200px) {
  #header {
    padding-left: 0;
    padding-right: 0;
    img {
      width: 50vw;
      max-width: 200px;
    }
    #header__buttons {
      width: 30vw;
      max-width: 100px;
      a {
        .contact {
          display: none;
        }
        .contact__icon {
          display: inline;
        }
      }
    }
  }
}
</style>
