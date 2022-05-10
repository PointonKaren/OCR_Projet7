<template>
  <!--Header-->
  <div id="header">
    <img :src="require('@/assets/logo.png')" />
    <div id="header__buttons">
      <button class="button signup">M'enregistrer</button>
      <button class="button login">Me connecter</button>
      <button class="button logout">Me déconnecter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxHeader",
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
    button {
      margin-left: 20px;
    }
  }
}
</style>
