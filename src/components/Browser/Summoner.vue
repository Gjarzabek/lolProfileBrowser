<template>
    <div class="ml-3 d-flex">
        <v-img
            max-height="150"
            max-width="150"
            :src="getIconUrl()"
            alt="Icon Image"
        ></v-img>
        <div>{{Username}}</div>
        <div>{{lvl}}</div>
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
