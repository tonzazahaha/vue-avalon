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
          var tempRoom = { ...room.val() }
          tempRoom['id'] = room.key
          temp.push(tempRoom)
        })
        commit('SETROOMS', temp)
      })
    },
    createRoom ({ rootGetters }, payload) {
      var user = rootGetters['Auth/getUser']
      var newKey = firebase.db.ref('rooms').push({
        roomName: payload.roomName,
        roomMode: payload.roomMode,
        roomPassword: payload.roomPassword,
        gamePhase: payload.gamePhase,
        roomSize: payload.roomSize
      }).key
      console.log(payload)
      return firebase.db.ref('rooms/' + newKey + '/players').child(user.uid).set({
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'good',
        leader: false
      })
    }
  }
}

export default LobbyModule
