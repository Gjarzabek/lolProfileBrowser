import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    summoner: {},
    matchHistory: [undefined],
    maxMatchLen: 10,
    appState: 'empty', // 'loading' | 'notfound' | 'empty' | 'found'
    API_KEY: 'RGAPI-58837c4c-f186-49e8-a365-6f371d1457fd'
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
    },
    changeKey(state, newKey) {
      state.API_KEY = newKey;
    }
  },
  actions: {
  },
  getters: {
  }
})
