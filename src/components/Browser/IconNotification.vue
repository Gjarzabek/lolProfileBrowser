<template>
    <div>
        <v-icon size="100" color="dark">{{icon}}</v-icon>
        <div class="dark--text">{{text}}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ["icon", "text"],
    methods: {},
    components: {},
    computed: {}
})
</script>