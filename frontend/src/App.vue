<template>
  <div id="app">
    <BoxHeader />
    <!-- <EditProfile /> -->
    <router-view />
  </div>
</template>

<script>
import BoxHeader from "./components/others/BoxHeader.vue";
// import EditProfile from "./components/user/EditProfile.vue";
export default {
  name: "App",
  components: {
    BoxHeader,
    // EditProfile,
  },
};
</script>

<style lang="scss">
@import url("./style/reset.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");
#app {
  background-image: url(assets/background.jpg);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  padding-bottom: 25px;
  font-family: "Roboto", sans-serif;
  h1,
  h2,
  p {
    color: #091f43;
  }
}
// Design des boutons
.button {
  cursor: pointer;
  color: white;
  background-color: #091f43;
  border: 2px solid white;
  box-shadow: 3px 4px 7px grey;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 8px 10px 6px 10px;
  &:active {
    background-color: #091f43b6;
    border: 2px solid #091f43;
  }

  i {
    font-size: 1.2em;
  }
}
.delete,
.edit,
.heart {
  border-radius: 50px;
}
.edit {
  padding-right: 7px;
  margin-left: 5px;
}
</style>
