import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    summoner: {},
    matchHistory: new Array(),
    maxMatchLen: 10,
    matchHistoryState: 'empty', // 'empty' | 'loading' | 'ready'
    appState: 'empty', // 'loading' | 'notfound' | 'empty' | 'found' | 'badkey' | 'error'
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
      if (state.matchHistory.length === state.maxMatchLen) {
        state.matchHistoryState = 'ready';
      }
      console.log(state.matchHistory.length);
    },
    resetHistory(state) {
      state.matchHistory = [];
      state.matchHistoryState = 'loading';
    },
    changeKey(state, newKey) {
      state.API_KEY = newKey;
    },
    changeHistoryState(state, historyState) {
      state.matchHistoryState = historyState;
    }    
  },
  actions: {
  },
  getters: {
  }
})
