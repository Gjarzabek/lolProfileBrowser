<template>
    <v-container fluid>
    <v-row justify="start" align="start" no-gutters>
      <v-col cols="auto">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn min-height="49"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              min-width="160"
            >
              {{chosenRegion.title}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item class="hover-region" @click="chosenRegion=item"
              v-for="(item, index) in regions"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col sm=7 md=5 lg=3>
          <v-text-field
            hide-details
            v-model="summonerNameInput"
            @click:append="searchSummoner"
            @keyup.enter="searchSummoner"
            clearable
            solo
            label="Summoner Name"
            append-icon="mdi-magnify"
          ></v-text-field>
      </v-col>
    </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {getLasstNMatches} from "@/Libcore/matchHistory"
import {API_KEY} from "@/Libcore/apiKey"

export default Vue.extend({
    props: [],
    data: () => {
      return {
        regions: [
          { title: 'North America' },
          { title: 'EUW' },
          { title: 'EUNE' }
        ],
        chosenRegion: { title: 'EUNE' },
        summonerNameInput: "",
      }
    },
    methods: {
      getRegionPrefix(): string {
        switch(this.chosenRegion.title) {
          case 'EUNE':
            return "eun1";
          case 'EUW':
            return "euw1";
          case 'North America':
            return 'na1';
          default:
            return "";
        }
      },
      searchSummoner(): void {
        console.log("search", this.summonerNameInput);
        if (!this.summonerNameInput)  this.$store.commit('changeAppState', 'empty');
        else this.fetchSummoner();
      },
      fetchSummoner(): void {
        const regionPrefix = this.getRegionPrefix();
        console.log("reqion", regionPrefix);
        this.$store.commit('changeAppState', 'loading');
        this.$store.commit('resetHistory');
        fetch(`https://${regionPrefix}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.summonerNameInput}?api_key=${API_KEY}`)
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
            getLasstNMatches('europe', summoner.puuid, (match: any)=>{
              this.$store.commit('changeMatchHistory', match);
            }, this.$store.state.maxMatchLen);
            this.$store.commit('changeAppState', 'found');
            this.$store.commit('changeSummoner', summoner);
          });
        })
      }
    },
    components: {},
    computed: {}
})
</script>
