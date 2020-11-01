import web3 from '@/web3'
import lottery from '@/lottery'

const state = {
    Accounts : [],
    ContarctBalance : 0,
    Manager:null,
    Players:[],
    LotteryRound:null
  };

  const getters = {
    Accounts:(state) => { return state.Accounts },
    ContarctBalance:(state) => { return state.ContarctBalance },
    Manager:(state) => { return state.Manager },
    Players:(state) => { return state.Players },
    LotteryRound:(state) => { return state.LotteryRound },

  };
  
  const actions = {
    FetchAccounts:async(contex) =>{
        const acc = await web3.eth.getAccounts()
        contex.commit('setAccounts' , acc )
    },

    FetchContractBalance:async(contex) =>{
      const bal = await web3.eth.getBalance(lottery.options.address)
      contex.commit('setContractBalance' , bal )
    },

    FetchManager:async(contex) =>{
      let man = null
        try{
          man = await lottery.methods.getManager().call({from : state.Accounts[0]})
        }catch{
          man = "something went worng"
        }
      contex.commit('setManagers' , man )
    },

    FetchPlayers:async(contex) =>{
      let plyers = null   
      plyers = await lottery.methods.getPlayers().call({from : state.Accounts[0]})  
      contex.commit('setPlayers' , plyers )
    },

    FetchLotteryRound:async(contex) =>{
      let lotteryRound = null   
      lotteryRound = await lottery.methods.getLotteryRound().call({from : state.Accounts[0]})  
      contex.commit('setLotteryRound' , lotteryRound )
    },

  };
  
  const mutations = { 

    setAccounts: (state, acc )=>{
      state.Accounts = acc
    },

    setContractBalance: (state, bal )=>{
      state.ContarctBalance = bal
    },
    
    setManagers: (state, man )=>{
      state.Manager = man
    },

    setPlayers: (state, plyers )=>{
      state.Players = plyers
    },

    setLotteryRound: (state, lotteryRound )=>{
      state.LotteryRound = lotteryRound
    },

  };

  export default{
    state,
    getters,
    actions,
    mutations
}