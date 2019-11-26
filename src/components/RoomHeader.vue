<template>
  <b-row align-v="start" class="px-5 room-detail" style="height: 115px;">
    <b-col cols="auto" align-self="center" class="ml-0">
      <span>Room Name</span>
      <h5>{{ roomName }}</h5>
    </b-col>
    <b-col cols="auto" align-self="center" class="ml-5">
      <span>Mode</span>
      <h5>{{ roomMode }}</h5>
    </b-col>
    <b-col cols="auto" align-self="center" class="ml-5">
      <span>Size</span>
      <h5>{{ players.length }}/{{ roomSize }}</h5>
    </b-col>
    <b-col align-self="center" cols="auto" class="ml-auto">
      <h5><em class="material-icons pr-2">build</em> Setting</h5>
    </b-col>
    <b-col align-self="center" cols="auto" class="ml-autox">
      <b-button variant="dark" class="px-5 bg-grey" @click="leaveRoom">Leave</b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    roomName: String,
    roomMode: String,
    players: Array,
    roomSize: Number
  },
  methods: {
    leaveRoom () {
      this.$store.dispatch('Room/leaveRoom', { id: this.$route.params.roomId })
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
