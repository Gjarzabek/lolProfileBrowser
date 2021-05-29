<template>
    <div class="match-history mt-4 pa-4">
        Meczyki
        <div v-if="history!=[]">
            <Match v-for="(item, index) in history" v-bind:key="index" :data="item"/>
        </div>
        <div v-else>ładowanie</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Match from '@/components/Browser/Match.vue'

export default Vue.extend({
    props: ["history"],
    methods: {},
    components: {Match},
    computed: {}
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