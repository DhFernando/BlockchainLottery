<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2> Round Num : {{ LotteryRound }}  </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" >
        <v-row>
          <v-col cols="12">
             <v-row class="mb-4">
                <v-col cols="1" ><v-icon class="pt-3">mdi-account-cog</v-icon> </v-col>
                <v-col cols="11">
                  Contract Managed by : {{Manager}}
                </v-col>
             </v-row>
             <v-row>
                There are <b class="mx-2">{{Players.length}}</b>  players competing for <b class="mx-2">{{ContarctBalance}}</b> Eth
             </v-row>
             <v-row>
               <v-col cols="12">
                   <v-list disabled>
                      <v-subheader>Current Players</v-subheader>
                      <v-list-item-group color="primary" >
                        <v-list-item v-for="(Player, i) in Players" :key="i" >
                          <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title v-text="Player"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                </v-col>  
             </v-row>

          </v-col>
        </v-row>
      </v-col>
       <v-col cols="5" class="ml-5">
        <v-row>
          <v-col cols="12"> 
            <v-row v-show="Manager == this.$store.getters.Accounts[0]">
              <v-col cols="6">Manager Logged in</v-col>
              <v-col cols="6">
                <v-btn v-show="Players.length >= 6" color="primary" @click="pickWinner" >Pick Winner</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-text-field  v-model="bet" type="number" label="Enter Etherium mount"  required ></v-text-field>
                </v-row>
                <v-row>
                    <v-btn v-if="bet >=0.2" color="success" @click="enter" >Enter to luck</v-btn> 
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
import web3 from '@/web3' 
import lottery from '@/lottery'

  export default {
    name: 'Home',

    data: () => ({  
      bet : 0
    }),
    mounted:function(){ 
      this.$store.dispatch("FetchContractBalance")
      this.$store.dispatch("FetchManager")
      this.$store.dispatch("FetchPlayers")  
      this.$store.dispatch("FetchLotteryRound")
    },
    computed: {
        test:function(){ return window.web3.currentProvider },
        Manager:function() { return this.$store.getters.Manager },
        Players:function() { return this.$store.getters.Players },
        ContarctBalance:function() {
           return web3.utils.fromWei( this.$store.getters.ContarctBalance.toString()  , 'ether')
        },
        LotteryRound:function(){ return this.$store.getters.LotteryRound }
    },
    methods:{
      async enter(){
        if(this.bet >= .2){ 
          await lottery.methods.enter().send({
          from : this.$store.getters.Accounts[0],
          value : web3.utils.toWei( this.bet.toString() , 'ether')
          })
          this.bet = 0
          this.$store.dispatch("FetchPlayers")
          this.$store.dispatch("FetchContractBalance")
        }else { alert("Minimun amount of Ether is 0.2 Eth ") }
      },

      async pickWinner(){ 
        await lottery.methods.pickWinner().send({
          from : this.$store.getters.Accounts[0]
        })

        
        this.$store.dispatch("FetchPlayers")
        this.$store.dispatch("FetchContractBalance")
      }
      
    }
    
  }
</script>
