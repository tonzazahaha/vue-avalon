<template>
  <div class="room">
    <layout-main>
      <b-spinner v-if="loading" variant="danger" class="loading" label="Large Spinner"></b-spinner>
      <layout-room v-if="room && !loading">
        <!-- room detail -->
        <template v-slot:room-detail>
          <room-header :roomName="room.roomName" :roomMode="room.roomMode" :players="room.players" :roomSize="room.roomSize" v-if="room.gamePhase === 0"></room-header>
          <game-header :room="room" v-else></game-header>
        </template>
        <!-- room wrapper -->
        <template v-slot:room-wrapper>
          <wrapper-room-player :players="room.players" :head="room.head" :leader="room.leader" :gamePhase="room.gamePhase"></wrapper-room-player>
        </template>
        <!-- room footer -->
        <template v-slot:room-footer>
          <b-col cols="auto" class="mx-auto" v-if="room.gamePhase === 0 && currentIsHead">
            <b-button variant="danger" class="btn-vote mx-3" @click="startGame" :disabled="room.players.length<5">START</b-button>
          </b-col>
          <b-col cols="auto" class="mx-auto" v-if="room.gamePhase === 0 && !currentIsHead">
            <h3 class="text-grey">Waiting for head's room start...</h3>
          </b-col>
          <game-footer :room="room" v-if="room.gamePhase !== 0"></game-footer>
        </template>
        <!-- End game -->
        <!-- <template v-slot:popup>
          <popup-win v-if="room.gamePhase == 6 && room.currentMission == 5"></popup-win>
          <popup-lose v-if="room.gamePhase == 9"></popup-lose>
        </template> -->

      </layout-room>
    </layout-main>
    <div class="popup">
      <!-- win -->
      <b-modal
      centered
      ref="my-modal"
      v-model="showWin"
      header-bg-variant="secondary"
      header-border-variant="secondary"
      body-bg-variant="secondary"
      footer-bg-variant="secondary"
      footer-border-variant="secondary"
      hide-footer title= "Using Component Methods"
      v-if="room.gamePhase === 6 && playerWin"
    >
      <template v-slot:modal-header class="mx-auto">
        <h5 class="mx-auto">YOU WIN!</h5>
      </template>
        <b-row align-h="center">
          <b-col cols='auto'>
            <img src="../assets/win.png" alt="win">
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols='auto'>
            <b-button class="mt-3" variant="outline-primary" @click="hideModal">OK</b-button>
          </b-col>
        </b-row>
    </b-modal>
    <!-- lose -->
    <b-modal
      centered
      ref="my-modal1"
      v-model="showLose"
      header-bg-variant="secondary"
      header-border-variant="secondary"
      body-bg-variant="secondary"
      footer-bg-variant="secondary"
      footer-border-variant="secondary"
      hide-footer title= "Using Component Methods"
      v-if="room.gamePhase === 6 && !playerWin"
    >
      <template v-slot:modal-header class="mx-auto">
        <h5 class="mx-auto">YOU LOSE!</h5>
      </template>
      <b-row align-h="center">
          <b-col cols='auto'>
            <img src="../assets/lose.png" alt="lose">
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols='auto'>
            <b-button class="mt-3" variant="outline-primary" @click="hideModal1">OK</b-button>
          </b-col>
        </b-row>
    </b-modal>
    </div>
  </div>
</template>

<script>
import LayoutMain from '../components/LayoutMain'
import LayoutRoom from '../components/LayoutRoom'
import WrapperRoomPlayer from '../components/WrapperRoomPlayer'
import RoomHeader from '../components/RoomHeader'
import GameHeader from '../components/GameHeader'
import GameFooter from '../components/GameFooter'

export default {
  components: {
    LayoutMain, LayoutRoom, WrapperRoomPlayer, RoomHeader, GameHeader, GameFooter
  },
  data () {
    return {
      players: [
        { id: '1', username: 'My name is so long', photoUrl: 'https://www.reactiongifs.com/wp-content/uploads/2013/07/running.gif', role: 'bad' },
        { id: '2', username: 'Meow', photoUrl: 'https://66.media.tumblr.com/tumblr_lt7bswjhFd1r4ghkoo1_250.gifv' },
        { id: '3', username: 'Minion', photoUrl: 'https://media3.giphy.com/media/1yYWGu3caE3m0/giphy.gif?cid=790b7611ec9b9bf971bbeffcc0ec7c276e0ca7064fcd0cde&rid=giphy.gif' },
        { id: '4', username: 'SatchanBNK48', photoUrl: 'https://media1.tenor.com/images/2bc6b4061aa554241e93c90ea7c62a45/tenor.gif?itemid=12499712https://media1.tenor.com/images/2bc6b4061aa554241e93c90ea7c62a45/tenor.gif?itemid=12499712' }
      ],
      leader: '1',
      gamePhase: 0,
      time: '10',
      rejectCount: 2,
      mission: [
        { round: '1', text: '3', result: 0 },
        { round: '2', text: '3', result: -1 },
        { round: '3', text: '3', result: -1 },
        { round: '4', text: '3', result: -1 },
        { round: '5', text: '4', result: -1 }
      ],
      currentMission: 0,
      showWin: true,
      showLose: true
    }
  },
  created () {
    this.$store.dispatch('Room/joinRoom', { id: this.$route.params.roomId, password: '' })
  },
  methods: {
    leaveRoom () {
      this.$store.dispatch('Room/leaveRoom', { id: this.$route.params.roomId })
    },
    startGame () {
      this.$store.dispatch('Room/gameStart', { id: this.$route.params.roomId })
    },
    hideModal () {
      this.$refs['my-modal'].hide()
      this.$store.dispatch('Room/leaveRoom', { id: this.$route.params.roomId })
    },
    hideModal1 () {
      this.$refs['my-modal1'].hide()
      this.$store.dispatch('Room/leaveRoom', { id: this.$route.params.roomId })
    }
  },
  computed: {
    user () {
      return this.$store.getters['Auth/getUser']
    },
    room () {
      return this.$store.getters['Room/getRoom']
    },
    loading () {
      return this.$store.getters['Room/getLoading']
    },
    currentIsHead () {
      const playerIndex = this.room.players.findIndex(player => player.id === this.user.uid)
      if (playerIndex > -1) {
        return this.room.players[playerIndex].id === this.room.head
      }
      console.log('can not check currentIsHead')
      return false
    },
    currentIsLeader () {
      const playerIndex = this.room.players.findIndex(player => player.id === this.user.uid)
      if (playerIndex > -1) {
        return this.room.players[playerIndex].id === this.room.leader
      }
      console.log('can not check currentIsLeader')
      return false
    },
    playerWin () {
      const playerIndex = this.room.players.findIndex(player => player.id === this.user.uid)
      if (playerIndex > -1) {
        return this.room.players[playerIndex].role === this.room.win
      }
      console.log('not found user to alert win')
      return false
    }
  }
}
</script>

<style>
.btn-vote {
  width: 130px;
  padding: 7px 0;
}
.loading {
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 40%;
  left: 50%;
}
</style>
