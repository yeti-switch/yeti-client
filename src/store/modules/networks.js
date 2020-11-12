import api from '@/api';
import { RESOURCES, NETWORKS } from '@/constants';
import utils from '@/utils';

const state = {
  networks: {},
  networksFilter: '',
};
const getters = {
  networks: (currentState) => ({
    items: currentState.networks.data, meta: currentState.networks.meta,
  }),
  networksFilter: (currentState) => currentState.networksFilter,
};
export const actions = {
  [NETWORKS.ACTIONS.GET_NETWORKS]: ({ commit, state: localState }, page) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const queryParams = { page, include: 'network-type' };

      if (localState.networksFilter) {
        queryParams.filter = { nameCont: localState.networksFilter };
      }

      const networks = await api.apiInstance.findAllResources(RESOURCES.NETWORKS, queryParams);

      commit(NETWORKS.MUTATIONS.SET_NETWORKS, networks);
    }),
  [NETWORKS.ACTIONS.SET_NETWORKS_FILTER]: ({ commit, dispatch }, filter) => {
    commit(NETWORKS.MUTATIONS.SAVE_NETWORKS_FILTER, filter);
    dispatch(NETWORKS.ACTIONS.GET_NETWORKS, 1);
  },
};
export const mutations = {
  [NETWORKS.MUTATIONS.SET_NETWORKS]: (currentState, networks) => {
    currentState.networks = networks;
  },

  [NETWORKS.MUTATIONS.SAVE_NETWORKS_FILTER]: (currentState, filter) => {
    currentState.networksFilter = filter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
