import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'

import './theme/custom.scss'

const token = localStorage.getItem('access_token')

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate () {
    if (token) {
      store.dispatch('Auth/fetchUser')
        .then(res => {
          if (res.success) {
            store.commit('Auth/SETUSER', res.userData)
          }
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem('access_token')
        })
    }
  },
  render: h => h(App)
}).$mount('#app')
