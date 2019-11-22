import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'

import './theme/custom.scss'

// const token = localStorage.getItem('access_token')

Vue.use(BootstrapVue)

Vue.config.productionTip = false

store.dispatch('Auth/fetchUser')
  .then(({ error }) => {
    if (error) {
      console.log(error)
    }
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })

// beforeCreate () {
//   if (token) {
//     store.dispatch('Auth/fetchUser')
//       .then(res => {
//         if (res.success) {
//           store.commit('Auth/SETUSER', res.userData)
//         }
//       })
//       .catch(err => {
//         console.log(err)
//         localStorage.removeItem('access_token')
//       })
//   }
// },
