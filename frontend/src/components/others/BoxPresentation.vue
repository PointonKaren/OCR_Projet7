<template>
  <!--Bloc "Présentaiton"-->
  <div id="presentation">
    <h2>Groupomania</h2>
    <p class="presentation__text">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, amet impedit
      rerum aliquid officiis ratione et ullam accusantium at praesentium ipsum
      tempora a natus iste minus suscipit sit quisquam. Beatae provident nostrum
      repudiandae totam vitae sint facere odio cumque iusto culpa! Et?
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
  width: 20vw;
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  padding-left: 20px;
  background-color: rgb(207, 207, 207);
  border: 2px solid #091f43;
}
</style>
