import api from '@/api';
import { RESOURCES, NETWORKS } from '@/constants';
import utils from '@/utils';

const state = {
  networkDetails: { data: {} },
};
const getters = {
  networkDetails: (currentState) => currentState.networkDetails.data,
};
export const actions = {
  [NETWORKS.ACTIONS.GET_NETWORK_DETAILS]: ({ commit }, id) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const networkDetails = await api.apiInstance.findOneResource(RESOURCES.NETWORKS, id, { include: 'network-type' });

      commit(NETWORKS.MUTATIONS.SAVE_NETWORK_DETAILS, networkDetails);
    }),
};
export const mutations = {
  [NETWORKS.MUTATIONS.SAVE_NETWORK_DETAILS]: (currentState, networkDetails) => {
    currentState.networkDetails = networkDetails;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
