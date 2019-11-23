<template>
  <div class="room">
    <layout-main>
      <layout-room>
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
      </layout-room>
    </layout-main>
  </div>
</template>

<script>
import LayoutMain from '../components/LayoutMain'
import LayoutRoom from '../components/LayoutRoom'

export default {
  components: {
    LayoutMain, LayoutRoom
  },
  data () {
    return {
      room: {
        roomName: 'ROOM ##',
        mode: 'nomal',
        amoung: 7,
        max: 10
      }
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
</style>
