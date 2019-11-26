<template>
  <div class="room">
    <layout-main>
      <layout-room v-if="room">
        <!-- room detail -->
        <template v-slot:room-detail>
          <b-row align-v="start" class="px-5 room-detail" style="height: 115px;">
            <b-col cols="auto" align-self="center" class="ml-0">
              <span>Room Name</span>
              <h5>{{ room.roomName }}</h5>
            </b-col>
            <b-col cols="auto" align-self="center" class="ml-5">
              <span>Mode</span>
              <h5>{{ room.roomMode }}</h5>
            </b-col>
            <b-col cols="auto" align-self="center" class="ml-5">
              <span>Size</span>
              <h5>{{ room.players.length }}/{{ room.roomSize }}</h5>
            </b-col>
            <b-col align-self="center" cols="auto" class="ml-auto">
              <h5><em class="material-icons pr-2">build</em> Setting</h5>
            </b-col>
            <b-col align-self="center" cols="auto" class="ml-autox">
              <b-button variant="dark" class="px-5 bg-grey" @click="leaveRoom">Leave</b-button>
            </b-col>
          </b-row>
        </template>
        <!-- room wrapper -->
        <template v-slot:room-wrapper>
          <wrapper-room-player :players="room.players" :head="room.head" :leader="leader"></wrapper-room-player>
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
      players: [
        { id: '1', username: 'My name is so long', photoUrl: 'https://www.reactiongifs.com/wp-content/uploads/2013/07/running.gif', role: 'bad' },
        { id: '2', username: 'Meow', photoUrl: 'https://66.media.tumblr.com/tumblr_lt7bswjhFd1r4ghkoo1_250.gifv' },
        { id: '3', username: 'Minion', photoUrl: 'https://media3.giphy.com/media/1yYWGu3caE3m0/giphy.gif?cid=790b7611ec9b9bf971bbeffcc0ec7c276e0ca7064fcd0cde&rid=giphy.gif' },
        { id: '4', username: 'SatchanBNK48', photoUrl: 'https://media1.tenor.com/images/2bc6b4061aa554241e93c90ea7c62a45/tenor.gif?itemid=12499712https://media1.tenor.com/images/2bc6b4061aa554241e93c90ea7c62a45/tenor.gif?itemid=12499712' }
      ],
      leader: '1',
      loading: false
    }
  },
  created () {
    this.$store.dispatch('Room/joinRoom', { id: this.$route.params.roomId, password: '' })
  },
  methods: {
    leaveRoom () {
      this.$store.dispatch('Room/leaveRoom', { id: this.$route.params.roomId })
      this.$router.push('/lobby')
    },
    ingame () {
      // this.$router.push('/ingame')
    }
  },
  computed: {
    user () {
      return this.$store.getters['Auth/getUser']
    },
    room () {
      return this.$store.getters['Room/getRoom']
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
