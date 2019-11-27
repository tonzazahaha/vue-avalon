import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from './modules/AuthModule'
import LobbyModule from './modules/LobbyModule'
import RoomModule from './modules/RoomModule'
import SidebarModule from './modules/SidebarModule'

Vue.use(Vuex)

const modules = {
  Auth: AuthModule,
  Lobby: LobbyModule,
  Room: RoomModule,
  Sidebar: SidebarModule
}

export default new Vuex.Store({
  modules
})
