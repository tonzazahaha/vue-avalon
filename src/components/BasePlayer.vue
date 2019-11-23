<template>
  <div class="player">
    <div class="player-image">
      <img :src="player.photoUrl" class="bg-grey" alt="">
    </div>
    <div class="player-name">
      {{ cutUsername }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      default: function () {
        return { photoUrl: '', username: '' }
      }
    },
    isLeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cutUsername () {
      if (this.player.username !== '') {
        return `${this.player.username.slice(0, 12)}...`
      }
      return ''
    }
  }
}
</script>

<style scoped>
.player .player-image img {
  display: block;
  width: 120px;
  height: 120px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.15), -5px -5px 20px rgba(0, 0, 0, 0.15);
}
.player .player-name {
  display: block;
  width: 120px;
  text-align: center;
  color: #e5e5e5;
  word-wrap: break-word;
}
</style>
