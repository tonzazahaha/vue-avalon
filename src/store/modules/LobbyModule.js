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
    socketFetchRoom ({ commit }, payload) {
      let item = [
        { room_id: '0001', room_name: 'room1##', mode: 'nomal', amoung: 7, max: 10 },
        { room_id: '0002', room_name: '1-1 dai mod kub', mode: 'nomal', amoung: 7, max: 7 }
      ]
      commit('SETROOMS', item)
    },
    createRoom ({ commit, state }, payload) {
      let oldRoom = [ ...state.rooms ]
      oldRoom.push(payload)
      commit('SETROOMS', oldRoom)
    },
    connectSocket ({ commit, state }, payload) {
      commit('SETSOCKET', io('localhost:3000/lobby'))
      state.socket.emit('enterLobby', { username: 'hello' })
    }
  }
}

export default LobbyModule
