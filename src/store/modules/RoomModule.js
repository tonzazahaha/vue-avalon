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
    joinRoom ({ dispatch, commit, rootGetters }, payload) {
      // init socket
      return firebase.db.ref('rooms').child(payload.id).once('value', snapshot => {
        if (snapshot.exists()) {
          if (snapshot.val().roomPassword === payload.password) {
            const temp = { ...snapshot.val() }
            temp.players = objToArr(temp.players)
            const currentUser = rootGetters['Auth/getUser']
            const playerIndex = temp.players.findIndex(p => p.id === currentUser.uid)
            if (playerIndex <= -1) {
              // if player not exist in room
              firebase.db.ref('rooms/' + payload.id + '/players').child(currentUser.uid).set({
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                role: 'good',
                leader: false
              })
            }
            commit('SETROOM', temp)
            alert('join room')
            dispatch('onRoomChange', payload)
          } else {
            alert('password wrong')
          }
        } else {
          alert('room not found')
          router.push('/lobby')
        }
      })
    },
    onRoomChange ({ commit }, payload) {
      firebase.db.ref('rooms').child(payload.id).on('value', snapshot => {
        const temp = { ...snapshot.val() }
        temp.players = objToArr(temp.players)
        commit('SETROOM', temp)
      })
    },
    leaveRoom ({ commit, rootGetters }, payload) {
      const currentUser = rootGetters['Auth/getUser']
      firebase.db.ref('rooms/' + payload.id + '/players').child(currentUser.uid).remove()
        .then(() => {
          router.push('/lobby')
        })
    }
  }
}

export default RoomModule
