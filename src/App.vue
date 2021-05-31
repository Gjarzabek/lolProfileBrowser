<template>
  <v-app id="inspire">
  <v-navigation-drawer
    v-model="drawer"
    app
    >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Lol Profile Browser
        </v-list-item-title>
        <v-list-item-subtitle>
          from challanger to challangers
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>

 <v-app-bar
      app
      color="primary"
      dark
    >

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="font-weight-black">Profile Browser</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-img
        max-height="50"
        max-width="50"
        src="logolol.png"
        class="mr-2"
      ></v-img>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Browser', icon: 'mdi-account-search-outline', to: "/"},
        { title: 'About', icon: 'mdi-help-box', to: "/about"},
        { title: 'Settings', icon: 'mdi-cog', to: "/settings"},
      ],
    }),
  }
</script>