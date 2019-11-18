import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from './modules/AuthModule'
import LobbyModule from './modules/LobbyModule'

Vue.use(Vuex)

const modules = {
  Auth: AuthModule,
  Lobby: LobbyModule
}

export default new Vuex.Store({
  modules
})
