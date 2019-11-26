import io from 'socket.io-client'
import { $api } from '../../services/api'

const RoomModule = {
  namespaced: true,
  state: {
    room: null,
    socket: null
  },
  getters: {
    getRoom (state) {
      return state.room
    }
  },
  mutations: {
    SETROOM (state, payload) {
      state.room = payload
    },
    SETSOCKET (state, payload) {
      state.socket = payload
    }
  },
  actions: {
    fetchRoomInfo ({ commit }, roomId) {
      return new Promise((resolve, reject) => {
        $api({ path: `/rooms/${roomId}`, method: 'get' })
          .then(resp => {
            if (resp.success) {
              resolve(resp)
            } else {
              reject(new Error('response fail'))
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    connectSocket ({ commit }) {
      commit('SETSOCKET', io('localhost:3000/room'))
    },
    disConnectSocket ({ commit, state }) {
      state.socket.disconnect()
      commit('SETSOCKET', null)
    },
    joinRoom ({ dispatch, state }, { roomId, player, password }) {
      // init socket
      dispatch('connectSocket')
      return new Promise((resolve, reject) => {
        state.socket.emit('join', { roomId, player, password }, ({ err }) => {
          console.log('err')
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }
  }
}

export default RoomModule
