import io from 'socket.io-client'
import { $api } from '@/services/api'

const LobbyModule = {
  namespaced: true,
  state: {
    rooms: [],
    socket: null
  },
  getters: {
    getRoomList (state) {
      return state.rooms
    }
  },
  mutations: {
    SETROOMS (state, payload) {
      state.rooms = payload
    },
    PUSHROOM (state, payload) {
      state.rooms.push(payload)
    },
    SETSOCKET (state, payload) {
      state.socket = payload
    }
  },
  actions: {
    fetchRoom ({ commit }) {
      $api({ path: '/rooms', method: 'get' })
        .then(res => {
          if (res.success) {
            commit('SETROOMS', res.roomData)
          } else {
            commit('SETROOMS', [])
          }
        })
    },
    createRoom ({ state }, payload) {
      state.socket.emit('createRoom', payload)
    },
    connectSocket ({ commit, rootGetters }) {
      let user = rootGetters['Auth/getUser']
      commit('SETSOCKET', io('localhost:3000/lobby', { query: user }))
    },
    onRooms ({ commit, state }) {
      state.socket.on('rooms', newRoom => {
        console.log(newRoom)
        commit('PUSHROOM', newRoom)
      })
    },
    disConnectSocket ({ commit, state }, payload) {
      state.socket.disconnect()
      commit('SETSOCKET', null)
    }
  }
}

export default LobbyModule
