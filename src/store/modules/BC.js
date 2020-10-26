import web3 from '@/web3'
import lottery from '@/lottery'

const state = {
    Accounts : [],
    ContarctBalance : 0,
    Manager:null,
    Players:[]
  };

  const getters = {
    Accounts:(state) => { return state.Accounts },
    ContarctBalance:(state) => { return state.ContarctBalance },
    Manager:(state) => { return state.Manager },
    Players:(state) => { return state.Players },
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
      const man = await lottery.methods.getManager().call()
      contex.commit('setManagers' , man )
    },

    FetchPlayers:async(contex) =>{
      const plyers = await lottery.methods.getPlayers().call()
      contex.commit('setPlayers' , plyers )
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

  };

  export default{
    state,
    getters,
    actions,
    mutations
}