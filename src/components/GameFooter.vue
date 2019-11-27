<template>
  <div class="mx-auto">
    <div v-if="room.gamePhase == 4">
      <b-col cols="auto" class="mx-auto">
        <b-button variant="success" class="btn-vote mx-3">Approve</b-button>
        <b-button variant="danger" class="btn-vote mx-3">Reject</b-button>
      </b-col>
    </div>
    <div v-if="room.gamePhase == 5">
      <b-col cols="auto" class="mx-auto">
        <b-button variant="success" class="btn-vote mx-3">success</b-button>
        <b-button variant="danger" class="btn-vote mx-3">Fail</b-button>
      </b-col>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    room: {
      type: Object,
      default: function () {
        return {
          gamePhase: 0,
          players: []
        }
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters['Auth/getUser']
    }
  }
}
</script>

<style>
.btn-vote {
  width: 130px;
  padding: 7px 0;
}
</style>
