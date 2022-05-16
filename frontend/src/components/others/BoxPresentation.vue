<template>
  <!--Bloc "Présentaiton"-->
  <div id="presentation">
    <h1>GroupoNetwork</h1>
    <h2>
      Bienvenue sur GroupoNetwork, LE réseau social conçu pour les employés de
      Groupomania !
    </h2>
    <p>
      Le but de cet outil est de faciliter les interactions entre employés, afin
      de permettre une amélioration de l'ambiance entre collègues et plus
      d'échange entre départements.
    </p>
    <p>
      Munissez-vous de votre adresse mail professionnelle et embarquez avec nous
      dans cette nouvelle aventure !
    </p>

    <p>
      Ce réseau social interne vous permettra de partager avec vos collègues
      inscrits du contenu multimédia tels que des gifs.
    </p>
    <p>
      Nous espérons que GroupoNetwork vous permettra de faire plus ample
      connaissance et ce, dans un cadre plus informel.
    </p>
  </div>
</template>

<script>
export default {
  name: "BoxPresentation",
};
</script>

<style lang="scss">
#presentation {
  h1 {
    text-align: center;
  }
  width: 40vw;
  margin: auto;
  margin-top: 10vh;
  padding-left: 20px;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
}
@media screen and (max-width: 1200px) {
  #presentation {
    display: none;
  }
}
</style>
