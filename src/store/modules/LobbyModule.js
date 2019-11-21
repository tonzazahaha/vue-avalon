import io from 'socket.io-client'

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
    SETSOCKET (state, payload) {
      state.socket = payload
    }
  },
  actions: {
    socketFetchRoom ({ commit, state }, payload) {
      state.socket.on('rooms', rooms => {
        // let oldRooms = [ ...state.rooms ]
        // oldRooms.push(room)
        commit('SETROOMS', rooms)
      })
    },
    createRoom ({ commit, state }, payload) {
      state.socket.emit('createRoom', payload)
    },
    connectSocket ({ commit, state }, payload) {
      let user = {
        username: 'tose',
        userId: '12345'
      }
      commit('SETSOCKET', io('localhost:3000/lobby', { query: user }))
      // state.socket.emit('enterLobby', { username: 'hello' })
    },
    disConnectSocket ({ commit, state }, payload) {
      state.socket.disconnect()
      commit('SETSOCKET', null)
    }
  }
}

export default LobbyModule
