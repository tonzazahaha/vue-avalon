const firebase = require('../../services/firebaseConfig')

const LobbyModule = {
  namespaced: true,
  state: {
    rooms: []
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
    }
  },
  actions: {
    fetchRoom ({ commit }) {
      firebase.db.ref('rooms').on('value', snapshot => {
        var temp = []
        snapshot.forEach(room => {
          temp.push(room.val())
        })
        commit('SETROOMS', temp)
      })
    },
    createRoom ({ commit }, payload) {
      firebase.db.ref('rooms').push(payload)
        .then(v => {
          console.log(v)
        })
    }
  }
}

export default LobbyModule
