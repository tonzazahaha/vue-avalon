<template>
  <div class="mx-auto">
    <div v-if="room.gamePhase === 3">
      <b-col cols="auto" class="mx-auto" v-if="isVisible">
        <b-button variant="success" class="btn-vote mx-3" @click="confirmTeam" :disabled="selectedTeam.length !== 3">Confirm Team</b-button>
      </b-col>
      <b-col cols="auto" class="mx-auto" v-if="!isVisible">
        <h3 class="text-grey">Waiting for leader select team...</h3>
      </b-col>
    </div>
    <div v-if="room.gamePhase === 4">
      <b-col cols="12" v-if="isVisible">
        <h5 class="text-grey text-center">Leader select:
          <span v-for="(p, index) in selectedTeam" :key="index">{{ p.displayName }}, </span>
        </h5>
      </b-col>
      <b-col cols="auto" class="mx-auto" v-if="isVisible">
        <b-button variant="success" class="btn-vote mx-3" @click="voteApprove(true)">Approve</b-button>
        <b-button variant="danger" class="btn-vote mx-3" @click="voteApprove(false)">Reject</b-button>
      </b-col>
      <b-col cols="auto" class="mx-auto" v-if="!isVisible">
        <h3 class="text-grey">Waiting for another vote...</h3>
      </b-col>
    </div>
    <div v-if="room.gamePhase === 5">
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
    },
    selectedTeam () {
      return this.room.players.filter(player => player.isSelected)
    }
  },
  methods: {
    confirmTeam () {
      if (this.selectedTeam.length !== 3) {
        alert('This mission require 3 players!!')
      } else {
        this.$store.dispatch('Room/confirmSelectedPlayer', { roomId: this.$route.params.roomId })
      }
    },
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
      let playerIndex = this.room.players.findIndex(p => p.id === this.user.uid)
      if (phase === 3) {
        if (this.room.leader === this.user.uid) {
          this.isVisible = true
        } else {
          this.isVisible = false
        }
      }
      else if (phase === 4) {
        this.isVisible = true
      } else if (phase === 5) {
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
