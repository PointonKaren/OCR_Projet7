<template>
  <!--Header-->
  <div id="header">
    <router-link to="/post">
      <img :src="require('@/assets/logo.png')" />
    </router-link>
    <a href="mailto:admin@groupomania.com"
      ><button class="button contact">Contact</button>
    </a>

    <!-- <ProfileButton /> -->
  </div>
</template>

<script>
// import ProfileButton from "../others/ProfileButton.vue";
export default {
  name: "BoxHeader",
  components: {
    // ProfileButton,
  },
};
</script>

<style lang="scss">
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
  a {
    .contact {
      font-size: 1.3em;
      margin-right: 25px;
    }
  }
}
@media screen and (max-width: 1200px) {
  #header {
    img {
      width: 35vw;
      margin-left: -10px;
    }
    a {
      .contact {
        font-size: 1em;
        margin-right: -10px;
      }
    }
  }
}
</style>
