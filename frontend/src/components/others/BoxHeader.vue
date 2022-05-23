<template>
  <!--Header-->
  <div id="header">
    <router-link to="/post">
      <img :src="require('@/assets/logo.png')" alt="Logo de Groupomania" />
    </router-link>
    <div id="header__buttons">
      <a href="mailto:admin@groupomania.com" title="contact"
        ><button aria-label="Contact" class="button contact">Contact</button>
        <button aria-label="Contact" class="button contact__icon">
          <i class="fa-regular fa-envelope"></i>
        </button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxHeader",
};
</script>

<style scoped lang="scss">
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 3px solid #d1515a;
  background-color: lightgrey;
  img {
    margin-left: 20px;
  }
  #header__buttons {
    a {
      .contact {
        font-size: 1.3em;
        margin-right: 25px;
      }
      .contact__icon {
        display: none;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  #header {
    img {
      width: 40vw;
    }
    #header__buttons {
      a {
        .contact {
          display: none;
        }
        .contact__icon {
          border-radius: 50px;
          padding-right: 9px;
          display: inline;
        }
      }
    }
  }
}
</style>
