<template>
  <div class="mx-auto">
    <div v-if="room.gamePhase == 4">
      <b-col cols="auto" class="mx-auto" v-if="isVisible">
        <b-button variant="success" class="btn-vote mx-3" @click="voteApprove(true)">Approve</b-button>
        <b-button variant="danger" class="btn-vote mx-3" @click="voteApprove(false)">Reject</b-button>
      </b-col>
      <b-col cols="auto" class="mx-auto" v-if="!isVisible">
        <h3 class="text-grey">Waiting for another vote...</h3>
      </b-col>
    </div>
    <div v-if="room.gamePhase == 5">
      <b-col cols="auto" class="mx-auto" v-if="isVisible">
        <b-button variant="success" class="btn-vote mx-3" @click="voteSuccess(true)">success</b-button>
        <b-button variant="danger" class="btn-vote mx-3" v-if="isCurrentUserBad" @click="voteSuccess(false)">Fail</b-button>
      </b-col>
      <b-col cols="auto" class="mx-auto" v-if="!isVisible">
        <h3 class="text-grey">Waiting for another vote... </h3>
      </b-col>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isVisible: true
    }
  },
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
  watch: {
    gamePhase (newPhase, oldPhase) {
      this.checkPhase(newPhase)
    }
  },
  created () {
    this.checkPhase(this.gamePhase)
  },
  computed: {
    user () {
      return this.$store.getters['Auth/getUser']
    },
    gamePhase () {
      return this.room.gamePhase
    },
    isCurrentUserBad () {
      let playerIndex = this.room.players.findIndex(p => p.id === this.user.uid)
      if (playerIndex > -1) {
        return this.room.players[playerIndex].role === 'bad'
      }
      return false
    }
  },
  methods: {
    voteSuccess (bool) {
      this.$store.dispatch('Room/voteSuccess', { roomId: this.$route.params.roomId, userId: this.user.uid, vote: bool })
        .then(() => {
          this.isVisible = false
        })
        .catch(e => {
          alert(e)
        })
    },
    checkPhase (phase) {
      if (phase === 5) {
        let playerIndex = this.room.players.findIndex(p => p.id === this.user.uid)
        if (playerIndex > -1) {
          this.isVisible = this.room.players[playerIndex].isSelected
          console.log('work')
        }
      }
    },
    voteApprove (bool) {
      this.$store.dispatch('Room/voteApprove', { roomId: this.$route.params.roomId, userId: this.user.uid, vote: bool })
      .then(() => {
          this.isVisible = false
        })
        .catch(e => {
          alert(e)
        })
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
