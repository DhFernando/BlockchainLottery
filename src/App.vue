<template>
  <v-app>
    <AppBar />
    <v-main v-if="checkAccountFetched == true" > 
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
  beforeCreate() {
      this.$store.dispatch("FetchAccounts")
      
  },
  computed:{
    checkAccountFetched:function(){ return this.$store.getters.Accounts.length != 0 }
  }
};
</script>
