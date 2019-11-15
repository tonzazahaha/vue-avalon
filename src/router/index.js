import Vue from 'vue'
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
<<<<<<< HEAD
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
=======
>>>>>>> 81aac5c20064838a1d1fd69d19fdfdbc154d53a4
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
<<<<<<< HEAD
=======
  },
  {
    path: '/lobby',
    name: 'lobby',
    component: () => import('../views/Lobby.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/ingame',
    name: 'ingame',
    component: () => import('../views/Ingame.vue')
>>>>>>> 81aac5c20064838a1d1fd69d19fdfdbc154d53a4
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
