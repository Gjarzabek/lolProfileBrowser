<template>
    <div class="ml-3 d-flex">
        <v-img
            max-height="120"
            max-width="120"
            :src="getIconUrl()"
            alt="Icon Image"
            class="rounded-lg"
        ></v-img>
        <div class="ml-3">
            <div class="headline font-weight-bold">{{Username}}</div>
            <div class="accent--text">level: {{lvl}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ["data"],
    methods: {
        getIconUrl(): string {
            return `http://ddragon.leagueoflegends.com/cdn/11.11.1/img/profileicon/${this.data.iconId}.png`;
        }
    },
    computed: {
        Username: function(): string {
            if (this.data && this.data.name)
                return this.data.name;
            return "undefined";
        },
        lvl: function(): number {
            if (this.data && this.data.lvl)
                return this.data.lvl;
            return 0;
        }
    }
})
</script>
