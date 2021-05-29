import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    summoner: {},
    matchHistory: [],
    appState: 'empty' // 'loading' | 'notfound' | 'empty' | 'found'
  },
  mutations: {
    changeSummoner(state, playerData) {
      state.summoner = playerData;
    },
    changeAppState(state, appState) {
      state.appState = appState;
    },
    changeMatchHistory(state, matchHistory) {
      state.matchHistory = matchHistory;
    }
  },
  actions: {
  },
  getters: {
  }
})
