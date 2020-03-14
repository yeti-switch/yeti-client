// eslint-disable-next-line
import { jsonApi } from '../../api';
import { RESOURCES, CDRS, NETWORK_SERVICE } from '../../constants';

const state = {
  cdrs: {},
  error: null,
  cdrFilter: {},
};
const getters = {
  cdrs: (currentState) => ({
    items: currentState.cdrs.data, meta: currentState.cdrs.meta,
  }),
  cdrFilter: (currentState) => currentState.cdrFilter,
};
const actions = {
  [CDRS.ACTIONS.GET_CDRS]: async ({ commit, rootState }, page) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });
    const filter = {
      timeStartGteq: rootState.timeRangeFilter.timeFilterValue.startDate,
      timeStartLteq: rootState.timeRangeFilter.timeFilterValue.endDate,
    };
    const cdrs = await jsonApi.findAllResources(RESOURCES.CDR, {
      filter,
      page,
    });
    if (cdrs.error) {
      commit(CDRS.MUTATIONS.SET_ERROR, cdrs.error);
    } else {
      commit(CDRS.MUTATIONS.SET_CDRS, cdrs);
    }
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
  },
  [CDRS.ACTIONS.SET_CDRS_FILTER]: ({ commit }, filter) => {
    if (filter) {
      commit(CDRS.MUTATIONS.SAVE_CDRS_FILTER, filter);
    }
  },
};
const mutations = {
  [CDRS.MUTATIONS.SET_CDRS]: (currentState, cdrs) => {
    currentState.cdrs = cdrs;
  },
  [CDRS.MUTATIONS.SET_ERROR]: (currentState, error) => {
    currentState.error = error;
  },
  [CDRS.MUTATIONS.SAVE_CDRS_FILTER]: (currentState, filter) => {
    currentState.cdrFilter = filter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
