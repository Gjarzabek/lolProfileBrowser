<template>
    <v-container fluid>
        <v-row>
            <v-col class="headline">Settings</v-col>
        </v-row>
        <KeyInput />
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import KeyInput from '@/components/Settings/KeyInput.vue'

export default Vue.extend({
    components: {KeyInput}
})
</script>
