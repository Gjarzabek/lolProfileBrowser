<template>
    <v-container fluid class="mt-1 custom-hover rounded-lg" :class="searchedSummonerColor">
        <v-row align="center">
            <v-col cols="12" sm="3" class="d-flex align-center justify-center">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-img
                            max-height="70"
                            max-width="70"
                            :src="getChampIconUrl(player.championName)"
                            alt="Icon Image"
                            v-bind="attrs"
                            v-on="on"
                            >
                        </v-img>
                    </template>
                    <span>{{player.championName}}</span>
                </v-tooltip>
            </v-col>
            <v-col cols="12" sm="3" class="h6 text-center text-sm-left font-weight-black">
                <a @click="$emit('search', {name: player.summonerName})">{{player.summonerName}}</a>
            </v-col>
            <v-col cols="12" sm="3" class="h6 text-center font-weight-medium">{{kda}}</v-col>
            <v-col cols="12" sm="3" class="text-center text-sm-right body-2">{{cs}}</v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: ["player"],
    methods: {
        getChampIconUrl(champName: string): string {
            return `https://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${champName}.png`;
        },
    },
    computed: {
        kda: function(): string {
            return `${this.player.kills} / ${this.player.deaths} / ${this.player.assists}`;
        },
        cs: function(): string {
            return `${this.player.cs} CS`;
        },
        searchedSummonerColor: function(): string {
            if (this.player.summonerName === this.$store.state.summoner.name)
                return 'accent lighten-2';
            else
                return '';
        }
    }
})
</script>

<style scoped>
a {
    color: black;
}

.custom-hover {
    background-color: #FAFAFA;
}

.custom-hover:hover {
    background-color: #EEEEEE;
}
</style>