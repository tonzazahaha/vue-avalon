import { $api } from '@/services/api'

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
      return state.user.username
    },
    getUrl (state) {
      return state.user.photoUrl
    }
  },
  mutations: {
    SETUSER (state, payload) {
      state.user = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        $api({ path: '/register', method: 'post', data: payload })
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
    login ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        $api({ path: '/login', method: 'post', data: payload })
          .then(res => {
            if (res.success) {
              localStorage.setItem('access_token', res.token)
              dispatch('fetchUser').then(res => {
                commit('SETUSER', res.userData)
                console.log('1')
                resolve(res)
              })
            } else {
              reject(new Error('response fail'))
            }
            console.log(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchUser ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        $api({ path: '/user', method: 'get' })
          .then(res => {
            console.log(res)
            if (res.success) {
              console.log('two')
              resolve(res)
            } else {
              reject(new Error('response fail'))
            }
            console.log(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default AuthModule
