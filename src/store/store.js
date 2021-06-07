import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import timeRangeFilter from './modules/timeRangeFilter';
import rates from './modules/rates';
import accounts from './modules/accounts';
import errors from './modules/errors';
import cdrs from './modules/cdrs';
import networks from './modules/networks';
import invoices from './modules/invoices';
import networkDetails from './modules/networkDetails';
import config from './modules/config';
import networkServices from './modules/networkServices';
import statisticsCharts from './modules/statisticsCharts';
import uiState from './modules/ui-state';

import { timeRangeWatcher } from './plugins/timeRangeWatcher';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [timeRangeWatcher],
  modules: {
    auth,
    rates,
    accounts,
    errors,
    cdrs,
    networks,
    invoices,
    config,
    timeRangeFilter,
    networkServices,
    statisticsCharts,
    networkDetails,
    uiState,
  },
});
