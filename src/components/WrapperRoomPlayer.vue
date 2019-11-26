<template>
  <b-row align-v="center" class="room-member pl-5">
    <b-col cols="2dot4"
      :offset="offset(index)"
      class="mx-auto my-3"
      v-for="(player, index) in fillPlayers"
      :key="index"
    >
      <base-player
        :player="player"
        :isLeader="leader === player.id"
        :isSelected="false"
        :isHead="head === player.id"
      ></base-player>
    </b-col>
  </b-row>
</template>

<script>
import BasePlayer from './BasePlayer'

export default {
  components: {
    BasePlayer
  },
  props: {
    players: {
      type: Array,
      default: function () {
        return [
          { id: '00', photoURL: '', displayName: '' }
        ]
      }
    },
    leader: {
      type: String,
      default: null
    },
    head: {
      type: String,
      default: ''
    }
  },
  computed: {
    fillPlayers () {
      const temp = [ ...this.players ]
      while (temp.length < 10) {
        temp.push({ id: '', photoURL: '', displayName: '' })
      }
      return temp
    }
  },
  methods: {
    offset (index) {
      return index === 0 ? 1 : 0
    }
  }
}
</script>

<style>
.col-2dot4 {
  flex: 0 0 20%;
  max-width: 20%;
}
</style>
