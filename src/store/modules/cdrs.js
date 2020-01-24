// eslint-disable-next-line
import { jsonApi } from '../../api';
import { RESOURCES, CDRS } from '../../constants';

const state = {
  cdrs: {},
  requestPending: false,
  error: null,
  cdrFilter: {},
};
const getters = {
  cdrs: (currentState) => ({
    items: currentState.cdrs.data, meta: currentState.cdrs.meta,
  }),
  isRequestPending: (currentState) => currentState.requestPending,
  cdrFilter: (currentState) => currentState.cdrFilter,
};
const actions = {
  getCdrs: async ({ commit }, page) => {
    commit(CDRS.MUTATIONS.SET_REQUEST_PENDING, true);
    const cdrs = await jsonApi.findAllResources(RESOURCES.CDR, {
      filter: state.cdrFilter,
      page,
      // @todo this is kinda hardcoded inclusion of auth-origin... relationships
      include: RESOURCES.AUTH_ORIGIN_TRANSPORT_PROTOCOL,
    });
    if (cdrs.error) {
      commit(CDRS.MUTATIONS.SET_ERROR, cdrs.error);
    } else {
      commit(CDRS.MUTATIONS.SET_CDRS, cdrs);
    }
    commit(CDRS.MUTATIONS.SET_REQUEST_PENDING, false);
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
  [CDRS.MUTATIONS.SET_REQUEST_PENDING]: (currentState, isPending) => {
    currentState.requestPending = isPending;
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
