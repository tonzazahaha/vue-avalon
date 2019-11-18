<template>
  <div class="lobby">
    <layout-main>
      <b-container fluid>
        <b-row>
          <b-col cols="auto" class="ml-auto p-3">
            <b-button variant="info" size="sm" class="px-4" @click="createRoom">Create Room</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="p-1 ml-0">
            <b-table
              :fields="roomTable.fields"
              :items="roomList"
              head-variant="light"
              table-variant="light"
              dark
              striped
              hover
              sticky-header="calc(100vh - 149px)"
            >
              <template v-slot:cell(size)="data">
                {{ data.item.amoung }}/{{ data.item.max }}
              </template>
              <template v-slot:cell()="data">
                {{ data.value }}
              </template>
              <template v-slot:cell(action)="data">
                <div class="mr-4">
                  <b-button size="sm" block variant="danger" @click="joinRoom(data.item.room_id)">Play</b-button>
                </div>
              </template>
            </b-table>

          </b-col>
        </b-row>
      </b-container>
    </layout-main>
  </div>
</template>

<script>
import LayoutMain from '../components/LayoutMain'

export default {
  data () {
    return {
      roomTable: {
        fields: [
          { key: 'room_id', sortable: true },
          { key: 'room_name', sortable: true },
          { key: 'mode' },
          { key: 'size', sortable: true },
          { key: 'action' }
        ],
        items: []
      }
    }
  },
  components: {
    LayoutMain
  },
  methods: {
    joinRoom (roomId) {
      this.$router.push(`/room/${roomId}`)
    },
    createRoom () {
      this.$store.dispatch('Lobby/createRoom', {
        room_id: '0034', room_name: 'new room', mode: 'nomal', amoung: 8, max: 10
      })
    }
  },
  created () {
    this.$store.dispatch('Lobby/socketFetchRoom', null)
    this.$store.dispatch('Lobby/connectSocket')
  },
  computed: {
    roomList () {
      return this.$store.getters['Lobby/getRoomList']
    }
  }
}
</script>

<style scoped>

</style>
