import router from '../../router'
import objToArr from '../../services/objToArr'
import randomRole from '../../services/randomRole'

const firebase = require('../../services/firebaseConfig')

const RoomModule = {
  namespaced: true,
  state: {
    room: null,
    loading: false
  },
  getters: {
    getLoading (state) {
      return state.loading
    },
    getRoom (state) {
      return state.room
    }
  },
  mutations: {
    SETROOM (state, payload) {
      state.room = payload
    },
    SETLOADING (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    joinRoom ({ dispatch, commit, rootGetters }, payload) {
      commit('SETLOADING', true)
      return firebase.db.ref('rooms').child(payload.id).once('value', snapshot => {
        if (snapshot.exists()) {
          if (snapshot.val().roomPassword === payload.password) {
            const temp = { ...snapshot.val() }
            temp.players = objToArr(temp.players)
            temp.missions = objToArr(temp.missions)
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
            commit('SETLOADING', false)
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
        temp.missions = objToArr(temp.missions)
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
      for (let i = 0; i < players.length; i++) {
        update['rooms/' + payload.id + '/players/' + players[i].id] = {
          displayName: players[i].displayName,
          photoURL: players[i].photoURL,
          role: roles[i]
        }
      }
      firebase.db.ref().update(update)
      var mission = {}
      for (let j = 1; j <= 5; j++) {
        mission['rooms/' + payload.id + '/missions/' + j] = {
          round: j,
          result: -1,
          text: 3
        }
      }
      firebase.db.ref().update(mission)
      firebase.db.ref('rooms/' + payload.id + '/currentMission').set(1)
    },
    voteSuccess ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        firebase.db.ref('rooms/' + payload.roomId + '/players/' + payload.userId).child('voteSuccess').set(payload.vote ? 1 : 0)
          .then(res => {
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}

export default RoomModule
