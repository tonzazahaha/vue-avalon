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
    fetchRoom ({ commit }) {

    },
    createRoom ({ state }, payload) {
      state.socket.emit('createRoom', payload)
    },
    connectSocket ({ commit, rootGetters }) {
      let user = rootGetters['Auth/getUser']
      commit('SETSOCKET', io('localhost:3000/lobby', { query: user }))
    },
    disConnectSocket ({ commit, state }, payload) {
      state.socket.disconnect()
      commit('SETSOCKET', null)
    }
  }
}

export default LobbyModule
