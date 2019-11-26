<template>
  <div class="room">
    <layout-main>
      <layout-room>
        <!-- game phase -->
        <template v-slot:room-detail>
          <game-header></game-header>
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
          <game-footer :vote="vote" :phase="phase"></game-footer>
        </template>
      </layout-room>
    </layout-main>
  </div>
</template>

<script>
import LayoutMain from '../components/LayoutMain'
import LayoutRoom from '../components/LayoutRoom'
import WrapperRoomPlayer from '../components/WrapperRoomPlayer'
import GameHeader from '../components/GameHeader'
import GameFooter from '../components/GameFooter'

export default {
  components: {
    LayoutMain, LayoutRoom, WrapperRoomPlayer, GameHeader, GameFooter
  },
  data () {
    return {
      game: {
        time: '10'
      },
      rejectCount: 2,
      circles: [
        { round: '1', text: '3', result: 0 },
        { round: '2', text: '3', result: -1 },
        { round: '3', text: '3', result: -1 },
        { round: '4', text: '3', result: -1 },
        { round: '5', text: '4', result: -1 }
      ],
      currentMission: 0
    }
  },
  methods: {
    leaveRoom () {
      this.$router.push('/lobby')
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
img.resize {
  width: 30px;
  height: 30px;
}
</style>
