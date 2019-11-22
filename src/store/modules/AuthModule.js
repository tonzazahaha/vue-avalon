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
      return state.user.username || ''
    },
    getUrl (state) {
      return state.user.photoUrl || ''
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
              dispatch('fetchUser')
                .then(({ error }) => {
                  if (!error) {
                    resolve()
                  }
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
      return new Promise((resolve, reject) => {
        commit('SETUSER', null)
        localStorage.removeItem('access_token')
        resolve()
      })
    }
  }
}

export default AuthModule
