import router from '../../router'
import objToArr from '../../services/objToArr'

const firebase = require('../../services/firebaseConfig')

const RoomModule = {
  namespaced: true,
  state: {
    room: null
  },
  getters: {
    getRoom (state) {
      return state.room
    }
  },
  mutations: {
    SETROOM (state, payload) {
      state.room = payload
    }
  },
  actions: {
    joinRoom ({ dispatch, commit }, payload) {
      // init socket
      firebase.db.ref('rooms').child(payload.id).on('value', snapshot => {
        if (snapshot.exists()) {
          if (snapshot.val().roomPassword === payload.password) {
            const temp = { ...snapshot.val() }
            temp.players = objToArr(temp.players)
            commit('SETROOM', temp)
            alert('join room')
          } else {
            alert('password wrong')
          }
        } else {
          alert('room not found')
          router.push('/lobby')
        }
      })
    }
  }
}

export default RoomModule
