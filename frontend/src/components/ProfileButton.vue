<template>
  <div class="comment__card">
    <!--Bouton "Profil"-->
    <div id="profile"></div>
  </div>
</template>

<script>
export default {
  name: "ProfileButton",
};
</script>

<style lang="scss">
#profile {
  background-image: url("https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC8zNzg4MDJiMC1jNTI4LTQ4MjktYjBiNS0wY2M2NDBkZjYzY2QuanBlZw==");
  height: 70px;
  width: 70px;
  background-size: cover;
  background-position: center;
  border-radius: 50px;
}
</style>
