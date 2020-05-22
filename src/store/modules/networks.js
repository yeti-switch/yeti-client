import { jsonApi } from '@/api';
import { RESOURCES, NETWORKS } from '@/constants';
import utils from '@/utils';

const state = {
  networks: {},
  networksFilter: {},
};
const getters = {
  networks: (currentState) => ({
    items: currentState.networks.data, meta: currentState.networks.meta,
  }),
  networksFilter: (currentState) => currentState.networksFilter,
};
const actions = {
  [NETWORKS.ACTIONS.GET_NETWORKS]: ({ commit }, page) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const networks = await jsonApi.findAllResources(RESOURCES.NETWORKS, { page, include: 'network-type' });

      commit(NETWORKS.MUTATIONS.SET_NETWORKS, networks);
    }),
  [NETWORKS.ACTIONS.SET_NETWORKS_FILTER]: ({ commit }, filter) => {
    if (filter) {
      commit(NETWORKS.MUTATIONS.SAVE_NETWORKS_FILTER, filter);
    }
  },
};
const mutations = {
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
