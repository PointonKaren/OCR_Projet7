<template>
  <!--Bloc "Signup"-->
  <div id="signup">
    <h2>M'enregistrer</h2>
    <form method="post" action="traitement.org">
      <p>
        <label for="firstName">Prénom : </label>
        <input class="input" type="text" name="pseudo" id="pseudo" required />
      </p>
      <p>
        <label for="surname">Nom : </label>
        <input class="input" type="text" name="pseudo" id="pseudo" required />
      </p>
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
      <p>
        Le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1
        minuscule et 2 chiffres.
      </p>
      <input type="submit" value="Envoyer" />
    </form>
  </div>
  <!--TODO: Voir dans le P5 comment a été géré le formulaire :-->
  <!--TODO: Utiliser les regex pour mail et mdp -->
  <!--TODO: Afficher les messages d'erreurs générés par le back. backend\controllers\user.js pour le mail et backend\utils\common.js pour le mdp. Cf P6 -->
</template>

<script>
export default {
  name: "BoxSignup",
};
</script>

<style lang="scss">
#signup {
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
