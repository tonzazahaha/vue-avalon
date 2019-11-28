<template>
  <b-row align-v="start" class="px-5 room-detail" style="height: 115px;">
    <b-col cols="2" class="mx-auto">
      <h1 class="display-3">{{ game.time }}s</h1>
    </b-col>
    <b-col cols="auto" class="mx-3 mt-3" v-for="(circle, index) in game.mission" :key="index">
      <template v-if="game.currentMission === index">
        <img alt="Round 1" src="../assets/player-icons/stage4blue.png" />
        <h1 class="centered-text">{{circle.text}}</h1>
      </template>
      <template v-else-if="circle.result  === -1">
        <img alt="Round 2" src="../assets/player-icons/stage1white.png" />
        <h1 class="centered-text">{{circle.text}}</h1>
      </template>
      <template v-else-if="circle.result === 0">
        <img alt="Round 2" src="../assets/player-icons/stage2red.png" />
        <h1 class="centered-text">{{circle.text}}</h1>
      </template>
      <template v-else-if="circle.result === 1">
        <img alt="Round 2" src="../assets/player-icons/stage3green.png" />
        <h1 class="centered-text">{{circle.text}}</h1>
      </template>
    </b-col>
    <b-col class="mx-auto">
      <b-row class="mx-auto mt-3">
            <h3 class="mx-auto">Reject Count</h3>
      </b-row>
      <b-row class="mx-auto">
          <div cols="auto" class="mx-auto">
            <img alt="" src="../assets/player-icons/image 5fire.png" class="resize mr-3" v-if="game.rejectCount >= 1">
            <img alt="" src="../assets/player-icons/circle.png" class="resize mr-3" v-else>
            <img alt="" src="../assets/player-icons/image 5fire.png" class="resize mx-auto" v-if="game.rejectCount >= 2">
            <img alt="" src="../assets/player-icons/circle.png" class="resize mx-auto" v-else>
            <img alt="" src="../assets/player-icons/image 5fire.png" class="resize ml-3" v-if="game.rejectCount >= 3">
            <img alt="" src="../assets/player-icons/circle.png" class="resize ml-3" v-else>
            </div>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>

export default {
  props: {
    game: {
      type: Object,
      default: function () {
        return {
          time: '10',
          rejectCount: 2,
          mission: [
            { round: '1', text: '3', result: 0 },
            { round: '2', text: '3', result: -1 },
            { round: '3', text: '3', result: -1 },
            { round: '4', text: '3', result: -1 },
            { round: '5', text: '4', result: -1 }
          ],
          currentMission: 0
        }
      }
    }
  }
}
</script>

<style scoped>
.img-text {
  position: relative;
  text-align: center;
  color: white;
}
.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
img.resize {
  width: 30px;
  height: 30px;
}
</style>
