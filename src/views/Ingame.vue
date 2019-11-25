<template>
  <div class="room">
    <layout-main>
      <layout-room>
        <!-- game phase -->
        <template v-slot:room-detail>
          <b-col cols="2" class="ml-2">
            <h1 class="display-3">10s</h1>
          </b-col>
          <b-col cols="auto" class="ml-5">
            <img alt="Round 1" src="../assets/player-icons/stage1white.png">
            <h1 class="centered-text">3</h1>
          </b-col>
          <b-col cols="auto" class="ml-1 img-text">
            <img alt="Round 2" src="../assets/player-icons/stage1white.png">
            <h1 class="centered-text">3</h1>
          </b-col>
          <b-col cols="auto" class="ml-1">
            <img alt="Round 3" src="../assets/player-icons/stage1white.png">
          </b-col>
          <b-col cols="auto" class="ml-1">
            <img alt="Round 4" src="../assets/player-icons/stage1white.png">
          </b-col>
          <b-col cols="auto" class="ml-1">
            <img alt="Round 5" src="../assets/player-icons/stage1white.png">
          </b-col>
        </template>
        <template v-slot:room-wrapper>
          <wrapper-room-player :players="players" :leader="leader"></wrapper-room-player>
        </template>
        <!-- room wrapper -->
        <template v-slot:room-wrapper>
          <wrapper-room-player :players="players" :leader="leader"></wrapper-room-player>
        </template>
        <!-- room footer -->
        <template v-slot:room-footer>
          <b-col cols="auto" class="mx-auto">
            <b-button variant="success" class="btn-vote mx-3">Approve</b-button>
            <b-button variant="danger" class="btn-vote mx-3">Reject</b-button>
            <b-button variant="success" class="btn-vote mx-3" @click="showWin = !showWin">Win</b-button>
            <b-button variant="danger" class="btn-vote mx-3"  @click="showLose = !showLose">Lose</b-button>
          </b-col>
        </template>
      </layout-room>
    </layout-main>
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
      ref="my-modal"
      v-model="showLose"
      header-bg-variant="secondary"
      header-border-variant="secondary"
      body-bg-variant="secondary"
      footer-bg-variant="secondary"
      footer-border-variant="secondary"
      hide-footer title= "Using Component Methods"
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
            <b-button class="mt-3" variant="outline-primary" @click="hideModal">OK</b-button>
          </b-col>
        </b-row>
    </b-modal>
  </div>
</template>

<script>
import LayoutMain from '../components/LayoutMain'
import LayoutRoom from '../components/LayoutRoom'
import WrapperRoomPlayer from '../components/WrapperRoomPlayer'

export default {
  components: {
    LayoutMain, LayoutRoom, WrapperRoomPlayer
  },
  data () {
    return {
      showWin: false,
      showLose: false,
      game: {
        time: '0'
      }
    }
  },
  methods: {
    leaveRoom () {
      this.$router.push('/lobby')
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    }
  }
}
</script>

<style>
.room-detail {
  color: white;
}
.room-detail span {
  color: #e5e5e5;
  opacity: .7;
}
.btn-vote {
  width: 130px;
  padding: 7px 0;
}
.game-phase {
  color: white;
}
.img-text {
  position: relative;
  text-align: center;
  color: white;
}
.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
