<template>
  <div class="room">
    <layout-main>
      <b-container class="h-100" fluid>
        <b-row align-v="start" class="p-5 room-detail">
          <b-col cols="auto" class="ml-0">
            <span>Room Name</span>
            <h5>{{ room.roomName }}</h5>
          </b-col>
          <b-col cols="auto" class="ml-5">
            <span>Mode</span>
            <h5>{{ room.mode }}</h5>
          </b-col>
          <b-col cols="auto" class="ml-5">
            <span>Size</span>
            <h5>{{ room.amoung }}/{{ room.max }}</h5>
          </b-col>
          <b-col align-self="center" cols="auto" class="ml-auto">
            <h5><em class="material-icons pr-2">build</em> Setting</h5>
          </b-col>
          <b-col align-self="center" cols="auto" class="ml-autox">
            <b-button variant="dark" class="px-5 bg-grey" @click="leaveRoom">Leave</b-button>
          </b-col>
        </b-row>
        <b-row align-v="center" class="px-5 py-3 room-member">
          avatar
        </b-row>
        <b-row align-v="end" class="px-5 py-3 room-actions">
          button
        </b-row>
      </b-container>
    </layout-main>
  </div>
</template>

<script>
import LayoutMain from '../components/LayoutMain'

export default {
  components: {
    LayoutMain
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
