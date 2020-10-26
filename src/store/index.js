import Vue from 'vue'
import Vuex from 'vuex'

import BC from './modules/BC'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        BC
    }
 
})