<template>
  <div class="player">
    <div class="player-image" :class="{'isEmpty': player.displayName === ''}">
      <div v-if="player.role == 'bad'" class="player-image" :class="{'player-bad': player.role === 'bad'}">
        <img :src="player.photoURL" class="player-image" :class="{'bg-grey': player.displayName !== ''}" alt="">
      </div>
      <div v-else-if="player.displayName == 'SatchanBNK48'" class="player-image" :class="{'player-cute': player.displayName === 'SatchanBNK48'}">
        <img :src="player.photoURL" class="player-image" :class="{'bg-grey': player.displayName !== ''}" alt="">
      </div>
      <img :src="player.photoURL" class="player-image" :class="{'bg-grey': player.displayName !== ''}" alt="" v-else>
      <img v-if="isLeader" src="../assets/player-icons/crown.png" class="icon-leader" alt="">
      <img v-if="player.displayName == 'SatchanBNK48'" src="../assets/saturn.png" class="icon-leader" alt="">
    </div>
    <div class="player-name">
      {{ cutUsername }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    player: {
      type: Object,
      default: function () {
        return { photoUrl: '', displayName: '', role: 'good' }
      }
    },
    isLeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cutUsername () {
      if (this.player.displayName !== '' && this.player.displayName.length >= 12) {
        return `${this.player.displayName.slice(0, 12)}...`
      }
      return this.player.displayName
    }
  }
}
</script>

<style>
.player .player-image {
  position: relative;
}
.player .player-image img.icon-leader {
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
.player-bad img {
  border: 5px solid red;
}
.player-cute img {
  border: 5px solid pink;
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
