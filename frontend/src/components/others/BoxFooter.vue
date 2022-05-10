<template>
  <!--Footer-->
  <div id="footer">
    <div id="footer__infos">
      <p>
        <a href="mailto:contact@groupomania.com">Contact</a>
      </p>
      <p>
        <img :src="require('@/assets/logo.png')" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxHeader",
};
</script>

<style lang="scss">
#footer {
  // position: sticky;
  // bottom: 0;
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 3px solid #d1515a;
  background-color: lightgrey;
  #footer__infos {
    p {
      padding: 0;
      margin: 0;
    }
    padding: 0 20px;
    width: 100%;
    border: 1px solid blue;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
