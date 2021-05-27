<template>
  <div>
    <SearchInput/>
    <div v-if="$store.state.appState=='found'">
      <Summoner :data="$store.state.summoner"/>
    </div>
    <div v-else-if="$store.state.appState=='empty'" class="no-summoner">
      <v-icon size="100" color="dark">mdi-domino-mask</v-icon>
      <div class="dark--text">No summoner to display</div>
    </div>
    <div v-else-if="$store.state.appState=='notfound'" class="no-summoner">
      <v-icon size="100" color="dark">mdi-drama-masks</v-icon>
      <div class="dark--text">Not found</div>
    </div>
    <Loading class="no-summoner" v-else-if="$store.state.appState=='loading'"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import SearchInput from '@/components/Browser/SearchInput.vue'
  import Loading from '@/components/Browser/Loading.vue'
  import Summoner from '@/components/Browser/Summoner.vue'

  export default Vue.extend({
    components: {SearchInput, Loading, Summoner},
    name: 'Browser',
    data: () => ({}),
    methods: {}
  })
</script>
<style lang="sass">
  .no-summoner
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%) scale(1.6)
    opacity: 0.6
    text-align: center

  .hover:hover
    background-color: rgb(228, 228, 228)
</style>
