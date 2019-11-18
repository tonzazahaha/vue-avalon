<template>
  <div class="lobby">
    <layout-main>
      <b-container fluid>
        <b-row>
          <b-col cols="auto" class="ml-auto p-3">
            <b-button variant="info" size="sm" class="px-4">Create Room</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="p-1 ml-0">
            <b-table
              :fields="roomTable.fields"
              :items="roomTable.items"
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
        items: [
          { room_id: '0001', room_name: 'room1##', mode: 'nomal', amoung: 7, max: 10 },
          { room_id: '0002', room_name: '1-1 dai mod kub', mode: 'nomal', amoung: 7, max: 7 },
          { room_id: '0003', room_name: 'kai kak', mode: 'Expert', amoung: 2, max: 5 },
          { room_id: '0004', room_name: 'Who\'s in the room', mode: 'nomal', amoung: 5, max: 5 },
          { room_id: '0005', room_name: 'come on baby', mode: 'nomal', amoung: 3, max: 8 },
          { room_id: '0001', room_name: 'room1##', mode: 'nomal', amoung: 7, max: 10 },
          { room_id: '0002', room_name: '1-1 dai mod kub', mode: 'nomal', amoung: 7, max: 7 },
          { room_id: '0003', room_name: 'kai kak', mode: 'Expert', amoung: 2, max: 5 },
          { room_id: '0004', room_name: 'Who\'s in the room', mode: 'nomal', amoung: 5, max: 5 },
          { room_id: '0005', room_name: 'come on baby', mode: 'nomal', amoung: 3, max: 8 },
          { room_id: '0001', room_name: 'room1##', mode: 'nomal', amoung: 7, max: 10 },
          { room_id: '0002', room_name: '1-1 dai mod kub', mode: 'nomal', amoung: 7, max: 7 },
          { room_id: '0003', room_name: 'kai kak', mode: 'Expert', amoung: 2, max: 5 },
          { room_id: '0004', room_name: 'Who\'s in the room', mode: 'nomal', amoung: 5, max: 5 },
          { room_id: '0005', room_name: 'come on baby', mode: 'nomal', amoung: 3, max: 8 }
        ]
      }
    }
  },
  components: {
    LayoutMain
  },
  methods: {
    joinRoom (roomId) {
      this.$router.push(`/room/${roomId}`)
    }
  }
}
</script>

<style scoped>

</style>
