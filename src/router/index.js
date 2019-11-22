import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      requireNoAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      requireNoAuth: true
    }
  },
  {
    path: '/lobby',
    name: 'lobby',
    component: () => import('../views/Lobby.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/room/:roomId',
    name: 'room',
    component: () => import('../views/Room.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/ingame',
    name: 'ingame',
    component: () => import('../views/Ingame.vue'),
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requireAuth)
  const requireNoAuth = to.matched.some(record => record.meta.requireNoAuth)

  // const token = localStorage.getItem('access_token')
  const user = store.getters['Auth/getUser']

  if (requireAuth && !user) {
    store.dispatch('Auth/logout')
    next('/login')
  } else if (requireNoAuth && user) {
    next('/lobby')
  } else {
    next()
  }
})
export default router
