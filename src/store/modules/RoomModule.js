import router from '../../router'
import objToArr from '../../services/objToArr'
import randomRole from '../../services/randomRole'

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
                isSelected: 0
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
    },
    gameStart ({ commit, state }, payload) {
      var update = {}
      update['rooms/' + payload.id + '/gamePhase'] = 1
      let players = [ ...state.room.players ]
      let roles = randomRole(players.length)
      let leader = Math.floor(Math.random() * (players.length + 1))
      update['rooms/' + payload.id + '/leader/'] = players[leader].id
      for (let i = 0; i < players.length; i++) {
        update['rooms/' + payload.id + '/players/' + players[i].id] = {
          displayName: players[i].displayName,
          photoURL: players[i].photoURL,
          role: roles[i]
        }
      }
      return firebase.db.ref().update(update)
    }
  }
}

export default RoomModule
