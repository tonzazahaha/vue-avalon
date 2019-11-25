<template>
  <div class="player">
    <div class="player-image" :class="{'isEmpty': player.username === ''}">
      <img :src="player.photoUrl" class="photo" :class="{'bg-grey': player.username !== ''}" alt="">
      <img v-if="isLeader" src="../assets/player-icons/crown.png" class="icon-leader" alt="">
      <img v-if="good">
      <img v-if="bad">
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
      if (this.player.username !== '' && this.player.username.length >= 12) {
        return `${this.player.username.slice(0, 12)}...`
      }
      return this.player.username
    }
  }
}
</script>

<style scoped>
.player .player-image {
  position: relative;
}
.player .player-image img.icon-leader {
  /* display: block; */
  position: absolute;
  transform: scale(.35);
  top: 50px;
  left: -40px;
  box-shadow: none;
  transition: .3s all;
}
.player .player-image img {
  display: block;
  width: 120px;
  height: 120px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.15), -5px -5px 20px rgba(0, 0, 0, 0.15);
}
.player .player-image.isEmpty img {
  background: transparent;
  box-shadow: none;
  border: #57627A dashed 2px;
  position: relative;
  cursor: pointer;
  transition: .2s all;
  color: #57627A;
}
.player .player-image.isEmpty img:hover {
  border-color: #e5e5e594;
  color: #e5e5e594;
}
.player .player-image.isEmpty img::before {
  content: '+';
  font-size: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
}
.player .player-name {
  display: block;
  width: 120px;
  height: 20px;
  text-align: center;
  color: #e5e5e5;
  word-wrap: break-word;
}
</style>
