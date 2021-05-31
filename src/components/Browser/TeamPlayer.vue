<template>
    <v-container fluid class="mt-1 custom-hover rounded-lg" @click="$emit('search', {name: player.summonerName})">
        <v-row align="center">
            <v-col>
                <v-img
                max-height="40"
                max-width="40"
                :src="getChampIconUrl(player.championName)"
                alt="Icon Image"
                >
                </v-img>
            </v-col>
            <v-col class="h6 text-center font-weight-black">{{player.summonerName}}</v-col>
            <v-col class="h6 text-center font-weight-medium">{{kda}}</v-col>
            <v-col class="text-center body-2">{{cs}}</v-col>
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
            return `${this.player.kills}/${this.player.deaths}/${this.player.assists}`;
        },
        cs: function(): string {
            return `${this.player.cs} CS`;
        }
    }
})
</script>

<style scoped>
.custom-hover {
    background-color: #FAFAFA;
    cursor: pointer;
}

.custom-hover:hover {
    background-color: #EEEEEE;
}
</style>