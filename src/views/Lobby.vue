<template>
  <div class="lobby">
    <layout-main>
      <b-container fluid>
        <b-row>
          <b-col cols="auto" class="ml-auto p-3">
            <b-button variant="info" size="sm" class="px-4" @click="showModal=true">Create Room</b-button>
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
    <!-- modal -->
    <b-modal
      centered
      v-model="showModal"
      header-bg-variant="secondary"
      header-border-variant="secondary"
      body-bg-variant="secondary"
      footer-bg-variant="secondary"
      footer-border-variant="secondary"
      @hidden="resetNewRoom"
    >
      <!-- header -->
      <template v-slot:modal-header class="mx-auto">
        <h5 class="mx-auto">Create Room</h5>
      </template>
      <!-- body -->
      <b-container>
        <b-form-group
          id="room-name-group"
          label="Room's Name"
          label-for="room-name"
        >
          <b-form-input
            id="room-name"
            type="text"
            v-model="newRoom.roomName"
            required
            placeholder="Enter your Room's Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="room-password-group"
          label="Room's Password"
          label-for="room-password"
        >
          <b-form-input
            id="room-password"
            type="password"
            v-model="newRoom.roomPassword"
            required
            placeholder="Enter your Room's Password"
          ></b-form-input>
        </b-form-group>
        <b-row>
          <b-col>
            <label for="">Maximum player</label>
          </b-col>
          <b-col>
            <b-form-select v-model="newRoom.roomSize" :options="options" disabled></b-form-select>
          </b-col>
        </b-row>
      </b-container>
      <!-- footer -->
      <template v-slot:modal-footer>
        <div class="w-50">
          <b-button variant="secondary" block class="text-danger" @click="showModal=false">Cancel</b-button>
        </div>
        <div class="w-50">
          <b-button variant="secondary" block class="text-info" @click="createRoom">Submit</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import LayoutMain from '../components/LayoutMain'

export default {
  data () {
    return {
      showModal: false,
      newRoom: {
        roomName: '',
        roomPassword: '',
        roomSize: 10
      },
      options: [
        { value: 10, text: '10' }
      ],
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
    close () {
      console.log('close')
      this.showModal = false
    },
    joinRoom (roomId) {
      this.$router.push(`/room/${roomId}`)
    },
    createRoom () {
      if (this.newRoom.roomName === '') {
        return alert('please enter room name')
      } else {
        this.$store.dispatch('Lobby/createRoom', {
          room_name: this.newRoom.roomName, mode: 'nomal', size: this.newRoom.size
        })
        this.showModal = false
      }
    },
    resetNewRoom () {
      this.newRoom = {
        roomName: '',
        roomPassword: '',
        roomSize: 10
      }
    }
  },
  created () {
    this.$store.dispatch('Lobby/connectSocket')
    this.$store.dispatch('Lobby/socketFetchRoom', null)
  },
  computed: {
    roomList () {
      return this.$store.getters['Lobby/getRoomList']
    }
  },
  destroyed () {
    this.$store.dispatch('Lobby/disConnectSocket')
  }
}
</script>

<style scoped>

</style>
