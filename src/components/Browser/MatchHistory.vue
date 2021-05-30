<template>
    <div class="match-history mt-4 pa-4">
        <Match v-for="(item, index) in history" v-bind:key="index" :data="item"/>
        <v-progress-linear
            v-if="!historyReady"
            indeterminate
            color="primary"
        ></v-progress-linear>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Match from '@/components/Browser/Match.vue'

export default Vue.extend({
    props: ["history"],
    methods: {},
    components: {Match},
    computed: {
        historyLen: function(): number {
            return this.history.length;
        },
        historyReady: function(): boolean {
            return this.historyLen >= this.$store.state.maxMatchLen;
        }
    }
})
</script>
<style scoped>
.match-history {
    position: relative;
    border-top: 1px solid rgb(196, 196, 196);
}

.match-history::after {
    content: "match history";
    position: absolute;
    bottom: 100%;
    right: 4px;
    color: rgb(138, 138, 138);
}
</style>