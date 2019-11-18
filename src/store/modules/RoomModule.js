
const RoomModule = {
  namespaced: true,
  state: {
    players: [],
  },
  getters: {
    getPlayer (state) {
      return state.players
    }
  },
  mutations: {
    SETPLAYER (state, payload) {
      state.players = payload
    }
  },
  actions: {
  }
}