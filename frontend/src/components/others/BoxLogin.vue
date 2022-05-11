<template>
  <!--Bloc "Login"-->
  <div id="login">
    <h1>Connexion</h1>
    <form method="post" action="traitement.org">
      <p>
        <label for="email">Mail professionnel : </label>
        <input
          class="input"
          type="email"
          name="email"
          id="email"
          placeholder="prenom.nom@groupomania.com"
          pattern=".+@groupomania\.com"
          required
        />
      </p>
      <p>
        <label for="password">Mot de passe : </label>
        <input
          class="input"
          type="password"
          name="password"
          id="password"
          required
        />
      </p>
      <input type="submit" value="Envoyer" class="button send" />
    </form>
  </div>
</template>

<script>
export default {
  name: "BoxLogin",
};
</script>

<style lang="scss">
#login {
  h1 {
    text-align: center;
  }
  width: 40vw;
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  padding-left: 20px;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      display: block;
      // width: 170px;
      float: left;
    }
  }
  .input {
    // width: 260px;
    text-align: center;
  }
  .send {
    margin: 0;
    margin-bottom: 20px;
    align-self: center;
  }
}
</style>
