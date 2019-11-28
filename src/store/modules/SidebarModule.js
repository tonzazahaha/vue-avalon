const SidebarModule = {
  namespaced: true,
  state: {
    tabs: [],
    tabIndex: 0
  },
  getters: {
    getTabs (state) {
      return state.tabs
    },
    getTabIndex (state) {
      return state.tabIndex
    }
  },
  mutations: {
    SETTABS (state, payload) {
      state.tabs = payload
    },
    SETTABINDEX (state, payload) {
      state.tabIndex = payload
    },
    ADDTAB (state, payload) {
      state.tabs.push(payload)
    }
  },
  actions: {

  }
}

export default SidebarModule
