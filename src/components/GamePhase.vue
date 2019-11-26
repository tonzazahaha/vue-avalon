<template>
  <div class="room">
    <layout-main>
      <layout-room>
        <!-- game phase -->
        <template v-slot:room-detail>
          <b-col cols="2" class="ml-2">
            <h1 class="display-3">10s</h1>
          </b-col>
          <b-col cols="auto" class="mx-auto my-3" v-for="(circle, index) in circles" :key="index">
            <template v-if="currentMission === index">
              <img alt="Round 1" src="../assets/player-icons/stage4blue.png" />
              <h1 class="centered-text">{{text}}</h1>
            </template>
            <template v-else-if="circle.result  === -1">
              <img alt="Round 2" src="../assets/player-icons/stage1white.png" />
              <h1 class="centered-text">{{text}}</h1>
            </template>
            <template v-else-if="circle.result === 0">
              <img alt="Round 2" src="../assets/player-icons/stage2red.png" />
              <h1 class="centered-text">{{text}}</h1>
            </template>
            <template v-else-if="circle.result === 1">
              <img alt="Round 2" src="../assets/player-icons/stage3green.png" />
              <h1 class="centered-text">{{text}}</h1>
            </template>
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
            <b-button variant="success" class="btn-vote mx-3" @click="currentMission += 1">Approve</b-button>
            <b-button variant="danger" class="btn-vote mx-3">Reject</b-button>
          </b-col>
        </template>
      </layout-room>
    </layout-main>
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
      game: {
        time: '0'
      },
      circles: [
        { round: '1', text: '3', result: 0 },
        { round: '2', text: '3', result: 1 },
        { round: '3', text: '3', result: -1 },
        { round: '4', text: '3', result: -1 },
        { round: '5', text: '4', result: -1 }
      ],
      currentMission: 2
    }
  },
  methods: {
    leaveRoom () {
      this.$router.push('/lobby')
    }
  },
  computed: {
    changeCircle () {
      const temp = [ ...this.circle ]
      while (temp.length < 5) {
        temp.push({ id: '', photoUrl: '', username: '' })
      }
      return temp
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
  opacity: 0.7;
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
