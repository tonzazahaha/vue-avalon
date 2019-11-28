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
        <b-button variant="success" class="btn-vote mx-3" @click="voteSuccess(true)">success</b-button>
        <b-button variant="danger" class="btn-vote mx-3" v-if="isCurrentUserBad" @click="voteSuccess(false)">Fail</b-button>
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
    },
    isCurrentUserBad () {
      let playerIndex = this.room.players.findIndex(p => p.id === this.user.uid)
      if (playerIndex > -1) {
        console.log('found')
        return this.room.players[playerIndex].role === 'bad'
      }
      return false
    }
  },
  methods: {
    voteSuccess (bool) {
      this.$store.dispatch('Room/voteSuccess', { roomId: this.$route.params.roomId, userId: this.user.uid, vote: bool })
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
