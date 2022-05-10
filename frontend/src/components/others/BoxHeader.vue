<template>
  <!--Header-->
  <div id="header">
    <img :src="require('@/assets/logo.png')" />
    <div id="header__buttons">
      <button class="button signup">M'enregistrer</button>
      <button class="button login">Me connecter</button>
      <!-- <ProfileButton /> -->
    </div>
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
  #header__buttons {
    border: 1px solid red;
    button {
      margin-left: 20px;
    }
  }
}
</style>
