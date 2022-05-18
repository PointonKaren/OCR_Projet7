<template>
  <!--Header-->
  <div>
    <div id="header">
      <router-link to="/post">
        <img :src="require('@/assets/logo.png')" alt="Logo de Groupomania" />
      </router-link>
      <div id="header__buttons">
        <a href="mailto:admin@groupomania.com"
          ><button class="button contact">Contact</button>
          <button class="button contact__icon">
            <i class="fa-regular fa-envelope"></i>
          </button>
        </a>
        <ProfileButton @click="toggle" />
      </div>
    </div>
    <Transition>
      <div v-if="profile_is_here">
        <BoxProfile />
      </div>
    </Transition>
  </div>
</template>

<script>
import ProfileButton from "../others/ProfileButton.vue";
import BoxProfile from "../others/BoxProfile.vue";
export default {
  name: "BoxHeaderLogged",
  components: {
    ProfileButton,
    BoxProfile,
  },
  data() {
    return {
      profile_is_here: false,
    };
  },
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
    justify-content: space-between;
    align-items: center;
    width: 180px;
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
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
