<template>
    <v-row>
        <v-col class="relative" col=auto md=5>
            <v-text-field
                solo
                v-model="keyInput"
                label="Riot api key"
                @keyup.enter="changeKey"
                prepend-inner-icon="mdi-key"
            >
            </v-text-field>
        </v-col>
        <v-col>
            <v-btn min-height="50" color="primary" elevation="2" @click="changeKey">Load Key</v-btn>
            <v-scroll-x-transition>
                <v-icon
                    v-if="loaded"
                    color="success"
                    class="custom-position-icon"
                    x-large
                >
                    mdi-check
                </v-icon>
            </v-scroll-x-transition>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            keyInput: "",
            loaded: false
        }
    },
    methods: {
        changeKey(): void {
            if (!this.keyInput || this.keyInput === "") return;
            console.log(this.keyInput)
            this.loaded = true;
            this.$store.commit('changeKey', this.keyInput);
            this.keyInput = "";
            setTimeout(()=>{this.loaded=false}, 1500);
        }
    }
})
</script>
<style>
.custom-position-icon {
    position: absolute;
    top: 0;
    right: -5%;
}
</style>