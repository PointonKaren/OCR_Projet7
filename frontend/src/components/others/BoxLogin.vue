<template>
  <!--Bloc "Login"-->
  <div id="login">
    <h2>Me connecter</h2>
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
      <input type="submit" value="Envoyer" />
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
  form {
    label {
      display: block;
      width: 170px;
      float: left;
    }
    .input {
      width: 260px;
      text-align: center;
    }
  }
}
</style>
