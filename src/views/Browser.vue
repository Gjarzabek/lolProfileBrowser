<template>
  <div>
    <SearchInput/>
    <div v-if="$store.state.appState=='found'">
      <Summoner  :data="$store.state.summoner"/>
      <MatchHistory :history="$store.state.matchHistory"/>
    </div>
    <StateInfo v-else/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import SearchInput from '@/components/Browser/SearchInput.vue'
  import Loading from '@/components/Browser/Loading.vue'
  import Summoner from '@/components/Browser/Summoner.vue'
  import StateInfo from '@/components/Browser/StateInfo.vue'
  import MatchHistory from '@/components/Browser/MatchHistory.vue'

  export default Vue.extend({
    components: {SearchInput, Loading, Summoner, StateInfo, MatchHistory},
    name: 'Browser',
    methods: {}
  })
</script>
<style lang="sass">
  .hover-region:hover
    background-color: rgb(228, 228, 228)
</style>
