<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container  ><router-view></router-view></v-container>
    </v-main>
  </v-app>
</template>

<script>
// import web3 from '@/web3'

import AppBar from '@/components/AppBar'
export default {
  name: 'App',

  components: { 
    AppBar
  },

  data: () => ({
    //
  }),
  beforeMount() {
      this.$store.dispatch("FetchAccounts")
      this.$store.dispatch("FetchContractBalance")
      this.$store.dispatch("FetchManager")
      this.$store.dispatch("FetchPlayers")
  },
};
</script>
