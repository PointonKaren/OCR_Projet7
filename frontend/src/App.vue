<template>
  <div id="app">
    <PageHome />
  </div>
</template>

<script>
import PageHome from "./page/PageHome.vue";
export default {
  name: "App",
  components: {
    PageHome,
  },
};
// let body = document.querySelector("body");

// body.style.backgroundColor = "#eee";
</script>

<style lang="scss">
@import url("./style/reset.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");
#app {
  font-family: "Roboto", sans-serif;
  h1,
  h2,
  p {
    color: #091f43;
  }
  p {
    font-size: 1.1em;
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
