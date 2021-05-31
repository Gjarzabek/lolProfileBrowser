<template>
  <v-expansion-panels>
    <v-expansion-panel max-width=150>
      <v-expansion-panel-header class="headline-2 font-weight-bold" :class="color">
        Team Stats
      </v-expansion-panel-header>
      <v-expansion-panel-content class="pa-0" :class="color">
          <v-container fluid>
            <v-row align="center" justify="space-between">
                <v-col cols=12 md=5 class="rounded-lg">
                  <div class="pl-3 rounded title grey lighten-5" :class="winInfoColor(leftTeamWin)">{{winInfoText(true)}}</div>  
                  <TeamPlayer @search="forwardSearch" v-for="(player, index) in leftTeam" :key="index" :player="player"/>
                </v-col>
                <v-col cols=12 md=1 class="accent--text accent-1 headline font-weight-black text-center">Vs</v-col>
                <v-col cols=12 md=5 class="rounded-xl">
                  <div class="pl-3 rounded title grey lighten-5" :class="winInfoColor(!leftTeamWin)">{{winInfoText(false)}}</div>  
                  <TeamPlayer @search="forwardSearch" v-for="(player, index) in rightTeam" :key="index" :player="player"/>
                </v-col>
            </v-row>
          </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import Vue from 'vue'
import TeamPlayer from '@/components/Browser/TeamPlayer.vue'
import {PlayerData} from '@/Libcore/matchData'

export default Vue.extend({
    props: ["players", "color"],
    computed: {
        leftTeamWin: function(): boolean {
          return this.players[0].win;
        },
        leftTeam: function(): Array<PlayerData> {
            const isLeftWon = this.leftTeamWin;
            return this.players.filter((player: PlayerData)=>{
                return isLeftWon === player.win;
            });
        },
        rightTeam: function(): Array<any> {
            const isLeftWon = this.leftTeamWin;
            return this.players.filter((player: PlayerData)=>{
                return isLeftWon !== player.win;
            });      
        }
    },
    methods: {
      forwardSearch(val: string): void {
        console.log('val', val);
        this.$emit('search', val);
      },
      winInfoText: function(isLeft: boolean): string {
        if (isLeft) {
          return this.leftTeamWin ? 'Victory' : 'Defeat';
        }
        return !this.leftTeamWin ? 'Victory' : 'Defeat';
      },
      winInfoColor: function(isWin: boolean): string {
        if (isWin) {
          return 'green--text';
        }
        else return 'red--text';
      }
    },
    components: {TeamPlayer}
})
</script>
