<template>
  <div>
    <SearchInput @search="fetchSummoner"/>
    <div v-if="$store.state.appState=='found'">
      <Summoner  :data="$store.state.summoner"/>
      <MatchHistory :history="$store.state.matchHistory" @search="fetchSummoner"/>
    </div>
    <StateInfo v-else/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import SearchInput from '@/components/Browser/SearchInput.vue'
  import Loading from '@/components/Browser/Loading.vue'
  import Summoner from '@/components/Browser/Summoner.vue'
  import StateInfo from '@/components/Browser/StateInfo.vue'
  import MatchHistory from '@/components/Browser/MatchHistory.vue'
  import {getLasstNMatches} from "@/Libcore/matchHistoryFetch"

  export default Vue.extend({
    data() {
      return {
        serverPrefix: "",
        region: ""
      }
    },
    components: {SearchInput, Loading, Summoner, StateInfo, MatchHistory},
    name: 'Browser',
    methods: {
      fetchSummoner(reqParams: any): void {
        if (reqParams.serverPrefix) this.serverPrefix = reqParams.serverPrefix;
        if (reqParams.region)       this.region = reqParams.region;
        const summonerName = reqParams.name;
        console.log("reqion", this.serverPrefix);
        this.$store.commit('changeAppState', 'loading');
        this.$store.commit('resetHistory');
        fetch(`https://${this.serverPrefix}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${this.$store.state.API_KEY}`)
        .then((res) => {
          console.log("res", res);
          if (res.statusText !== "OK") {
            this.$store.commit('changeAppState', 'notfound');
            return;
          }
          res.json().then((summonerData)=>{
            console.log("summonerData:", summonerData);
            const summoner = {
              name: summonerData.name,
              iconId: summonerData.profileIconId,
              lvl: summonerData.summonerLevel,
              puuid: summonerData.puuid
            }
            getLasstNMatches(this.region, summoner.puuid, (matchHist: any)=>{
              this.$store.commit('changeMatchHistory', matchHist);
            }, this.$store.state.maxMatchLen, summonerName, this.$store.state.API_KEY);
            this.$store.commit('changeAppState', 'found');
            this.$store.commit('changeSummoner', summoner);
          });
        })
      }
    }
  })
</script>
<style lang="sass">
  .hover-region:hover
    background-color: rgb(228, 228, 228)
</style>
