<template>
    <v-container fluid>
    <v-row justify="start" align="start" no-gutters>
      <v-col cols="auto">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn min-height="49"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              min-width="160"
            >
              {{chosenRegion.title}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item class="hover-region" @click="chosenRegion=item"
              v-for="(item, index) in regions"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col sm=7 md=5 lg=3>
          <v-text-field
            hide-details
            v-model="summonerNameInput"
            @click:append="searchSummoner"
            @keyup.enter="searchSummoner"
            clearable
            solo
            label="Summoner Name"
            append-icon="mdi-magnify"
          ></v-text-field>
      </v-col>
    </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: [],
    data: () => {
      return {
        regions: [
          { title: 'North America' },
          { title: 'EUW' },
          { title: 'EUNE' }
        ],
        chosenRegion: { title: 'EUNE' },
        summonerNameInput: "",
      }
    },
    methods: {
      getServerPrefix(): string {
        switch(this.chosenRegion.title) {
          case 'EUNE':
            return "eun1";
          case 'EUW':
            return "euw1";
          case 'North America':
            return 'na1';
          default:
            return "eun1";
        }
      },
      getRegion(): string {
        switch(this.getServerPrefix()) {
          case 'eun1':
          case 'euw1':
            return 'europe';
          case 'na1':
            return 'americas';
          default:
            return "europe";
        }
      },
      searchSummoner(): void {
        console.log("search", this.summonerNameInput);
        if (!this.summonerNameInput)  this.$store.commit('changeAppState', 'empty');
        else this.$emit('search', {
          serverPrefix: this.getServerPrefix(),
          region: this.getRegion(),
          name: this.summonerNameInput
        });
      }
    },
    components: {},
    computed: {}
})
</script>
