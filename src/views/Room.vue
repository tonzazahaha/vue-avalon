<template>
  <div class="room">
    <layout-main>
      <layout-room>
        <!-- room detail -->
        <template v-slot:room-detail>
          <b-col cols="auto" align-self="center" class="ml-0">
            <span>Room Name</span>
            <h5>{{ room.roomName }}</h5>
          </b-col>
          <b-col cols="auto" align-self="center" class="ml-5">
            <span>Mode</span>
            <h5>{{ room.mode }}</h5>
          </b-col>
          <b-col cols="auto" align-self="center" class="ml-5">
            <span>Size</span>
            <h5>{{ room.amoung }}/{{ room.max }}</h5>
          </b-col>
          <b-col align-self="center" cols="auto" class="ml-auto">
            <h5><em class="material-icons pr-2">build</em> Setting</h5>
          </b-col>
          <b-col align-self="center" cols="auto" class="ml-autox">
            <b-button variant="dark" class="px-5 bg-grey" @click="leaveRoom">Leave</b-button>
          </b-col>
        </template>
        <!-- room wrapper -->
        <template v-slot:room-wrapper>
          <wrapper-room-player :players="players" :leader="leader"></wrapper-room-player>
        </template>
        <!-- room footer -->
        <template v-slot:room-footer>
          <b-col cols="auto" class="mx-auto">
            <b-button variant="danger" class="btn-vote mx-3" @click="ingame">START</b-button>
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
      room: {
        roomName: 'ROOM 0001',
        mode: 'nomal',
        amoung: 7,
        max: 10
      },
      players: [
        { id: '1', username: 'My name is so long', photoUrl: 'https://www.reactiongifs.com/wp-content/uploads/2013/07/running.gif' },
        { id: '2', username: 'Meow', photoUrl: 'https://66.media.tumblr.com/tumblr_lt7bswjhFd1r4ghkoo1_250.gifv' },
        { id: '3', username: 'Minion', photoUrl: 'https://media3.giphy.com/media/1yYWGu3caE3m0/giphy.gif?cid=790b7611ec9b9bf971bbeffcc0ec7c276e0ca7064fcd0cde&rid=giphy.gif' }
      ],
      leader: '1'
    }
  },
  methods: {
    leaveRoom () {
      this.$router.push('/lobby')
    },
    ingame () {
      this.$router.push('/ingame')
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
</style>
