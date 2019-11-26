import { $api } from '@/services/api'
import router from '../../router'
const firebase = require('../../services/firebaseConfig')

const AuthModule = {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getUserName (state) {
      return state.user.displayName || ''
    },
    getUrl (state) {
      return state.user.photoURL || ''
    },
    getEmail (state) {
      return state.user.email || ''
    }
  },
  mutations: {
    SETUSER (state, payload) {
      state.user = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      firebase.auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          data.user.updateProfile({
            displayName: payload.username,
            photoURL: payload.photoUrl
          })
            .then(() => {
              Promise.resolve()
            })
            .catch(err => {
              Promise.reject(err)
            })
        })
        .catch(err => {
          Promise.reject(err)
        })
    },
    async autoLogin ({ commit }, payload) {
      await commit('SETUSER', payload)
    },
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        firebase.auth.signInWithEmailAndPassword(payload.email, payload.password)
          .then(data => {
            commit('SETUSER', data.user)
            router.push('/lobby')
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchUser ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        if (!localStorage.getItem('access_token')) {
          return resolve({ error: new Error('No token to authentication') })
        }
        $api({ path: '/user', method: 'get' })
          .then(res => {
            if (res.success) {
              commit('SETUSER', res.userData)
              resolve({ error: null })
            } else {
              dispatch('logout')
              resolve({ error: new Error('response fail') })
            }
          })
          .catch(err => {
            dispatch('logout')
            resolve({ error: err })
          })
      })
    },
    logout ({ commit }) {
      firebase.auth.signOut()
        .then(() => {
          commit('SETUSER', null)
          Promise.resolve()
        })
        .catch(err => {
          Promise.reject(err)
        })
    }
  }
}

export default AuthModule
