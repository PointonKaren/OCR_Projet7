<template>
  <!--Bloc "Signup"-->
  <div id="signup">
    <h1>Inscription</h1>
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
          title="Minimun 8 caractères, 1 majuscule, 1
        minuscule et 2 chiffres."
        />
      </p>
      <input type="submit" value="Envoyer" class="button send" />
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
  width: 40vw;
  max-width: 600px;
  margin: auto;
  padding-left: 20px;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
  margin-bottom: 30px;
  h1 {
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 1.3em;
      label {
        display: block;
        text-align: center;
        margin-bottom: 20px;
      }

      .input {
        width: 25vw;
        max-width: 300px;
        text-align: center;
        &::placeholder {
          font-size: 0.9em;
        }
      }
    }
    .send {
      margin: 0;
      margin-bottom: 20px;
      align-self: center;
      padding-right: 15px;
      padding-left: 15px;
      font-size: 1.3em;
    }
  }
}
@media screen and (max-width: 1200px) {
  #signup {
    margin-top: 30px;
    padding: 0;
    width: 90vw;
    h1 {
      font-size: 1.3em;
    }
    form {
      margin: 0;
      p {
        margin: 0;
        font-size: 1em;
        label {
          margin: 0;
          margin-bottom: 10px;
          margin-top: 10px;
        }
        .input {
          width: 80vw;
        }
      }
      .send {
        margin-top: 20px;
        font-size: 1em;
      }
    }
  }
}
</style>
