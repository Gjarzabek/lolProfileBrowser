<template>
    <v-container fluid>
        <v-row justify="space-between" align="center">
            <v-col cols=6 sm=4 md="2" class="d-flex align-center">
                <v-tooltip color="transparent" open-delay=125>
                    <template v-slot:activator="{ on, attrs }">
                        <v-img
                            max-height="80"
                            max-width="80"
                            :src="getChampIconUrl(summoner.championName)"
                            alt="Icon Image"
                            class="rounded-lg"
                            v-bind="attrs"
                            v-on="on"
                        ></v-img>
                    </template>
                    <span>
                        <v-img
                            :src="getChampAssetUrl(summoner.championName)"
                            alt="Champ asset"
                            class="rounded-lg"
                        ></v-img>
                    </span>
                </v-tooltip>
                <div class="ml-3">
                    <div class="headline2 font-weight-bold primary--text">{{summoner.championName}}</div>
                    <div class="secondary--text">level: {{summoner.level}}</div>
                </div>
            </v-col>
            <v-col cols=6 sm=4 md="auto" class="text-right text-sm-center text-lg-center">
                <div class="h6 font-weight-medium">{{kda}}</div>
                <div class="body-2">{{cs}}</div>
            </v-col>
            <v-col cols=4 sm=4 md="auto" class="d-flex justify-left justify-sm-end" align-self="center">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-img
                            max-height="30"
                            max-width="30"
                            :src="getSummonerSpellIconUrl(summoner.summoner1Id)"
                            alt="Icon Image"
                            class="rounded-circle"
                            v-bind="attrs"
                            v-on="on"
                            >
                        </v-img>
                    </template>
                    <span>{{getSummonerSpellImgStr(summoner.summoner1Id).slice(0, -4)}}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-img
                            max-height="30"
                            max-width="30"
                            :src="getSummonerSpellIconUrl(summoner.summoner2Id)"
                            alt="Icon Image"
                            class="rounded-circle"
                            v-bind="attrs"
                            v-on="on"
                            >
                        </v-img>
                    </template>
                    <span>{{getSummonerSpellImgStr(summoner.summoner2Id).slice(0, -4)}}</span>
                </v-tooltip>
            </v-col>
            <v-col cols=8 sm=4 md="3">
                <div class="d-flex justify-end justify-sm-start">
                    <v-img class="ma-1" max-height="35" max-width="35" v-for="(n, index) in validItems.slice(0, 3)" :key="index" :src="getItemUrl(n)"></v-img>
                </div>
                <div class="d-flex justify-end justify-sm-start">
                    <v-img class="ma-1" max-height="35" max-width="35" v-for="(n, index) in validItems.slice(3)" :key="index" :src="getItemUrl(n)"></v-img>
                </div>
            </v-col>
            <v-col class="primary--text text-left text-sm-center text-md-right">{{matchDuration}}</v-col>
            <v-col class="primary--text text-center text-sm-right">{{timeAgo}}</v-col>
            <v-col sm=12 class="headline text-right font-weight-black" :class="winInfoColorClass">{{winInfo}}</v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ["summoner", "duration", "startTimestamp"],
    methods: {
        validItem(itemId: number): boolean {
            return itemId !== undefined && itemId > 0;
        },
        getItemUrl(itemId: number): string {
            return `https://ddragon.leagueoflegends.com/cdn/11.11.1/img/item/${itemId}.png`;
        },
        getChampIconUrl(champName: string): string {
            return `https://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${champName}.png`;
        },
        getChampAssetUrl(champName: string): string {
            return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`;
        },
        getSummonerSpellIconUrl(spellId: number): string {
            return `https://ddragon.leagueoflegends.com/cdn/11.11.1/img/spell/${this.getSummonerSpellImgStr(spellId)}`;
        },
        getSummonerSpellImgStr(spellId: number): string {
            let spellName = ".png";
            switch(spellId) {
                case 21:
                    spellName = "SummonerBarrier.png";
                break;
                case 1:
                    spellName = "SummonerBoost.png";
                break;
                case 14:
                    spellName = "SummonerDot.png";
                break;
                case 3:
                    spellName = "SummonerExhaust.png";
                break;
                case 4:
                    spellName = "SummonerFlash.png";
                break;
                case 6:
                    spellName = "SummonerHaste.png";
                break;
                case 7:
                    spellName = "SummonerHeal.png";
                break;
                case 13:
                    spellName = "SummonerMana.png";
                break;
                case 30:
                    spellName = "SummonerPoroRecall.png";
                break;
                case 31:
                    spellName = "SummonerPoroThrow.png";
                break;
                case 11:
                    spellName = "SummonerSmite.png";
                break;
                case 39:
                    spellName = "SummonerSnowURFSnowball_Mark.png";
                break;
                case 32:
                    spellName = "SummonerSnowball.png";
                break;
                case 12:
                    spellName = "SummonerTeleport.png";
                break;
            }
            return spellName;
        }
    },
    components: {},
    computed: {
        validItems: function(): any {
            if (!this.summoner || !this.summoner.itemsIds) return [];
            return this.summoner.itemsIds.filter((itemId: number) => {
                return itemId !== undefined && itemId > 0;
            });
        },
        timeAgo: function(): string {
            const timeDiff = (new Date()).getTime() - this.startTimestamp;
            const secondsAgo = Math.floor(timeDiff / 1000);
            const minutesAgo = Math.floor(secondsAgo / 60);
            const hoursAgo = Math.floor(minutesAgo / 60);
            const daysAgo = Math.floor(hoursAgo / 24);
            if (daysAgo > 1)    return `${daysAgo} days ago`;
            if (hoursAgo > 0)    return `${hoursAgo} h ago`;
            if (minutesAgo > 0)    return `${minutesAgo} minutes ago`;
            if (secondsAgo > 0)    return `${secondsAgo} sec ago`;
            return "";
        },
        matchDuration: function(): string {
            const minutes = Math.floor(this.duration / 1000 / 60);
            return `${minutes} min`;
        },
        isWin: function(): boolean {
            return this.summoner.win;
        },
        kda: function(): string {
            return `${this.summoner.kills} / ${this.summoner.deaths} / ${this.summoner.assists}`
        },
        cs: function(): string {
            return `${this.summoner.cs} CS`;
        },
        winInfo: function(): string {
            return this.summoner.win ? "Win" : "Loss";
        },
        winInfoColorClass: function(): string {
            return !this.summoner.win ? "red--text" : "green--text";
        }
    }
})
</script>
