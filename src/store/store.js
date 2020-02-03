import Vue from 'vue';
import Vuex from 'vuex';

/* eslint-disable import/no-cycle */

import auth from './modules/auth';
import timeRangeFilter from './modules/timeRangeFilter';
import rates from './modules/rates';
import accounts from './modules/accounts';
import errors from './modules/errors';
import cdrs from './modules/cdrs';
import config from './modules/config';
import networkServices from './modules/networkServices';
import activeCalls from './modules/activeCalls';

import { currentAccountWatcher } from './plugins/currentAccountWatcher';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [currentAccountWatcher],
  modules: {
    auth,
    rates,
    accounts,
    errors,
    cdrs,
    config,
    timeRangeFilter,
    networkServices,
    activeCalls,
  },
});
