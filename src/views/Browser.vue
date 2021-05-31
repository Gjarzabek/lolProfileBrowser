<template>
  <div>
    <SearchInput @newRegion="changeRegion" @search="fetchSummoner"/>
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
        serverPrefix: "eun1",
        region: "europe"
      }
    },
    components: {SearchInput, Loading, Summoner, StateInfo, MatchHistory},
    name: 'Browser',
    methods: {
      changeRegion(regionObj: any): void {
        this.serverPrefix = regionObj.serverPrefix;
        this.region = regionObj.region;
        console.log(this.serverPrefix, this.region);
      },
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
          if (res.status === 401 || res.status === 403) {
            this.$store.commit('changeAppState', 'badkey');
            return;
          }
          else if (res.status === 404) {
            this.$store.commit('changeAppState', 'notfound');
            return;
          }
          else if (res.statusText !== "OK") {
            this.$store.commit('changeAppState', 'error');
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
            getLasstNMatches(this.region, summoner.puuid, (matchList: any)=>{
              if (matchList === 'noHistory') {
                this.$store.commit('changeHistoryState', 'empty');
                return;
              }
              else if (matchList === 'emptyMatch') {
                this.$store.commit('changeHistoryState', 'ready');
                return;
              }
              this.$store.commit('changeMatchHistory', matchList);
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
