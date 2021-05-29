<template>
    <div>
        <IconNotification class="state-info" v-if="$store.state.appState=='empty'"
        icon="mdi-domino-mask"
        text="No summoner to display"
        />
        <IconNotification class="state-info" v-else-if="$store.state.appState=='notfound'"
        icon="mdi-drama-masks"
        text="Not found"
        />
        <IconNotification class="state-info" v-else-if="$store.state.appState=='badkey'"
        icon="mdi-alert-circle"
        text="Wrong Api Key!"
        />
        <Loading class="state-info" v-else-if="$store.state.appState=='loading'"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/Browser/Loading.vue'
import IconNotification from '@/components/Browser/IconNotification.vue'

export default Vue.extend({
    methods: {},
    components: {Loading, IconNotification},
    computed: {}
})
</script>

<style lang="sass">
  .state-info
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%) scale(1.6)
    opacity: 0.6
    text-align: center
</style>