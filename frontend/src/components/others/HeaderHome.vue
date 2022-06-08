<template>
  <!--Header-->
  <header>
    <img :src="require('@/assets/logo.png')" alt="Logo de Groupomania" />
    <div id="header__buttons">
      <a href="mailto:admin@groupomania.com" title="contact"
        ><button aria-label="Contact" class="button contact">Contact</button>
        <button aria-label="Contact" class="button contact__icon">
          <i class="fa-regular fa-envelope"></i>
        </button>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderHome",
};
</script>

<style scoped lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

header {
  @include header;
}

@media screen and (max-width: 1200px) {
  header {
    @include header_responsive;

    #header__buttons {
      max-width: 50px;
    }
  }
}
</style>
