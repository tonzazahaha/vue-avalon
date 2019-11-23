<template>
  <div class="room">
    <b-container class="h-100" fluid>
      <b-row align-v="start" class="px-5 room-detail" style="height: 115px;">
        <!-- room detail -->
        <slot name="room-detail"></slot>
      </b-row>
      <b-row align-v="center" class="room-member">
        <b-row align-h="start" class="w-100">
          <b-col cols="1" class="mx-auto mt-3" v-for="(player, index) in fillPlayers.slice(0,5)" :key="index">
            <base-player :player="player"></base-player>
          </b-col>
        </b-row>
        <b-row align-h="start" class="w-100">
          <b-col cols="1" class="mx-auto mt-3" v-for="(player, index) in fillPlayers.slice(5)" :key="index">
            <base-player :player="player"></base-player>
          </b-col>
        </b-row>
      </b-row>
      <b-row align-v="end" class="px-5 py-3 room-actions">
        button
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BasePlayer from './BasePlayer'

export default {
  components: {
    BasePlayer
  },
  data () {
    return {
      players: [
        { photoUrl: 'https://66.media.tumblr.com/b67db8ee80b61b7417f30a4faf494828/f2f39746a6815e16-b0/s250x400/067749e86ddd099e928dfc3a759d31979cff3bc3.gifv', username: 'ALOVALA1' },
        { photoUrl: 'https://66.media.tumblr.com/b67db8ee80b61b7417f30a4faf494828/f2f39746a6815e16-b0/s250x400/067749e86ddd099e928dfc3a759d31979cff3bc3.gifv', username: 'ALOVssssssssssssssssssssssssssssssALA2' },
        { photoUrl: 'https://66.media.tumblr.com/b67db8ee80b61b7417f30a4faf494828/f2f39746a6815e16-b0/s250x400/067749e86ddd099e928dfc3a759d31979cff3bc3.gifv', username: 'ALOVALA10' }
      ]
    }
  },
  computed: {
    fillPlayers () {
      const temp = [ ...this.players ]
      while (temp.length < 10) {
        temp.push({ photoUrl: '', username: '' })
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
  opacity: .7;
}
</style>
