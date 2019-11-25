<template>
  <div class="room">
    <layout-main>
      <layout-room>
        <!-- game phase -->
        <template v-slot:room-wrapper>
          <wrapper-room-player :players="players" :leader="leader"></wrapper-room-player>
        </template>
        <!-- room wrapper -->
        <template v-slot:room-wrapper>
          <wrapper-room-player :players="players" :leader="leader"></wrapper-room-player>
        </template>
        <!-- room footer -->
        <template v-slot:room-footer>
          <b-col cols="auto" class="mx-auto">
            <b-button variant="success" class="btn-vote mx-3">Approve</b-button>
            <b-button variant="danger" class="btn-vote mx-3">Reject</b-button>
          </b-col>
        </template>
      </layout-room>
    </layout-main>
  </div>
</template>

<script>
import LayoutMain from '../components/LayoutMain'
import LayoutRoom from '../components/LayoutRoom'
import WrapperRoomPlayer from '../components/WrapperRoomPlayer'

export default {
  components: {
    LayoutMain, LayoutRoom, WrapperRoomPlayer
  },
  data () {
    return {
      game: {
        time: '0'
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
.btn-vote {
  width: 130px;
  padding: 7px 0;
}
.game-phase {
  color: white;
}
</style>
