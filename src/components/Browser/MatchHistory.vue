<template>
    <div class="match-history mt-4">
        <div class="rounded ml-3 title grey lighten-4 primary--text" v-if="$store.state.matchHistoryState === 'empty'">
            No recent matches played
        </div>
        <div v-else>
            <Match @search="forwardSearch" class='mt-4' v-for="(item, index) in history" v-bind:key="index" :data="item"/>
            <v-progress-linear
                v-if="!historyReady"
                indeterminate
                color="primary"
            ></v-progress-linear>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Match from '@/components/Browser/Match.vue'

export default Vue.extend({
    props: ["history"],
    methods: {
        forwardSearch(val: any): void {
            this.$emit('search', val);
        }
    },
    components: {Match},
    computed: {
        historyLen: function(): number {
            return this.history.length;
        },
        historyReady: function(): boolean {
            return this.$store.state.matchHistoryState === 'ready';
        }
    }
})
</script>
<style scoped>
.match-history {
    position: relative;
}

.match-history::after {
    content: "match history";
    position: absolute;
    bottom: 100%;
    right: 5px;
    color: rgb(138, 138, 138);
}
</style>