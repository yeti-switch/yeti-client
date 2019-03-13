import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import rates from './modules/rates'
import accounts from './modules/accounts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    rates,
    accounts
  }
})
