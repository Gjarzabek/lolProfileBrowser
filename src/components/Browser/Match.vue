<template>
    <div class="pa-3 light-blue lighten-4">
        <InMatchSummoner :summoner="data.SummonerInfo" :duration="data.gameDuration" :startTimestamp="data.startTimestamp"/>
        <MatchTeams @search="forwardSearch" :players="data.OtherPlayers" color="light-blue lighten-5"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InMatchSummoner from '@/components/Browser/InMatchSummoner.vue'
import MatchTeams from '@/components/Browser/MatchTeams.vue'

export default Vue.extend({
    props: ["data"],
    components: {InMatchSummoner, MatchTeams},
    methods: {
        forwardSearch(val: any): void {
            this.$emit('search', val);
        }
    }
})
</script>
