import { $api } from '@/services/api'

const AuthModule = {
  namespaced: true,
  state: {
    user: null
  },
  getter: {
    getUser (state) {
      return state.user
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
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        $api({ path: '/login', method: 'post', data: payload })
          .then(res => {
            if (res.success) {
              resolve(res)
            } else {
              reject(new Error('response fail'))
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default AuthModule
