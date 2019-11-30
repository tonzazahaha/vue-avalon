<template>
  <div class="player">
    <div class="player-image" :class="{'isEmpty': player.displayName === ''}" @click="selectTeam">
      <img v-if="player.displayName !== ''"
        alt=""
        :src="player.photoURL" class="player-image"
        :class="[{'player-bad': player.role === 'bad' && userRole === 'bad' && gamePhase !== 0},{'canSelect': room.leader === user.uid}]"
      >
      <img v-else :src="player.photoURL" class="player-image" :class="{'bg-grey': player.displayName !== ''}" alt="">
      <img v-if="leader === player.id && gamePhase !== 0" src="../assets/player-icons/crown.png" class="icon-leader" alt="">
      <img v-if="player.isSelected === 1" src="../assets/player-icons/swords.png" class="icon-selected" alt="">
    </div>
    <div class="player-name" :class="{'isMe': player.id === user.uid}">
      {{ cutUsername }} <span v-if="isHead && gamePhase === 0">(head)</span>
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
    index: {
      type: Number
    },
    leader: {
      type: String,
      default: 'error'
    },
    player: {
      type: Object,
      default: function () {
        return { photoUrl: '', displayName: '', role: 'good' }
      }
    },
    isHead: {
      type: Boolean,
      default: false
    },
    gamePhase: {
      type: Number,
      default: 0
    },
    userRole: {
      type: String,
      default: 'good'
    }
  },
  computed: {
    cutUsername () {
      if (this.player.displayName !== '' && this.player.displayName.length >= 10) {
        return `${this.player.displayName.slice(0, 10)}...`
      }
      return this.player.displayName
    },
    user () {
      return this.$store.getters['Auth/getUser']
    },
    room () {
      return this.$store.getters['Room/getRoom']
    }
  },
  methods: {
    selectTeam () {
      if (this.user.uid === this.leader && this.gamePhase === 3) {
        this.player.isSelected = this.player.isSelected === 1 ? 0 : 1
      }
    }
  }
}
</script>

<style>
.player .player-image img.canSelect:hover {
  filter: brightness(1.5);
  transition: .3s all;
  cursor: pointer;
}
.player .player-name.isMe {
  color: yellow;
}
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
.player .player-image img.icon-selected {
  position: absolute;
  transform: scale(.35);
  top: -50px;
  left: 40px;
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
