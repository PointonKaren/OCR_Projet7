<template>
  <popup-modal ref="popup" class="popup">
    <h2 class="confirmation__title">Confirmation</h2>
    <p class="confirmation__message">{{ message }}</p>
    <div class="btns">
      <button class="cancel-btn" @click="_cancel">{{ cancelButton }}</button>
      <span class="ok-btn" @click="_confirm">{{ okButton }}</span>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from "./PopupModal.vue";

export default {
  name: "ConfirmDialogue",

  components: { PopupModal },

  data: () => ({
    // Parameters that change depending on the type of dialogue
    title: undefined,
    message: undefined, // Main text content
    okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
    cancelButton: "Annuler", // text for cancel button

    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    show(opts = {}) {
      this.message = opts.message;
      this.okButton = opts.okButton;
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton;
      }
      this.$refs.popup.open();
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _confirm() {
      this.$refs.popup.close();
      this.resolvePromise(true);
    },

    _cancel() {
      this.$refs.popup.close();
      this.resolvePromise(false);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

.popup {
  margin-top: 10px;
  background-color: $background;
  border: 1px solid $primaire;

  .confirmation__message,
  .confirmation__title {
    text-align: center;
  }
  .btns {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .ok-btn,
    .cancel-btn {
      padding: 0.5em 1em;
      border-radius: 5px;
      font-weight: bold;
      font-size: 16px;
      text-transform: uppercase;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .cancel-btn {
      background-color: #cea1a4;
      color: $tertiaire;
      border: 2px solid $tertiaire;
    }

    .ok-btn {
      background-color: #d5eae7;
      color: #35907f;
      border: 2px solid #0ec5a4;
    }
  }
}
@media screen and (max-width: 1200px) {
  .popup {
    position: absolute;
    top: 30vh;
  }
}
</style>
