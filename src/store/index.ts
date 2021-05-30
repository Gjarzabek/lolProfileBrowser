import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    summoner: {},
    matchHistory: [undefined],
    maxMatchLen: 10,
    appState: 'empty' // 'loading' | 'notfound' | 'empty' | 'found'
  },
  mutations: {
    changeSummoner(state, playerData) {
      state.summoner = playerData;
    },
    changeAppState(state, appState) {
      state.appState = appState;
    },
    changeMatchHistory(state, matchData) {
      state.matchHistory.push(matchData);
      console.log(state.matchHistory.length);
    },
    resetHistory(state) {
      state.matchHistory = [];
    }
  },
  actions: {
  },
  getters: {
  }
})
