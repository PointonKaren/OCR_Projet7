<template>
  <transition name="fade">
    <div class="popup-modal" v-if="isVisible">
      <div class="delete__popup">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PopupModal",

  data: () => ({
    isVisible: false,
  }),

  methods: {
    open() {
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_buttons.scss";

/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
