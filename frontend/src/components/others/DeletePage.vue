<template>
  <div class="delete__button" @click="deleteConfirm()">
    <button class="button profile__delete__account" @click="deleteAccount()">
      Supprimer mon compte
    </button>
    <p>Action irréversible !</p>
    <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
  </div>
</template>

<script>
import ConfirmDialogue from "./ConfirmDialogue.vue";

export default {
  name: "DeletePage",
  components: { ConfirmDialogue },
  methods: {
    async deleteConfirm() {
      const ok = await this.$refs.confirmDialogue.show({
        title: "Supprimer le compte",
        message:
          "Êtes vous certain(e) de vouloir supprimer votre compte ? Cette action est irréversible.",
        okButton: "Confirmer",
      });
      if (ok) {
        alert("Le compte a été supprimé");
      } else {
        alert("Le compte n'a pas été supprimé");
      }
    },
  },
};
</script>
