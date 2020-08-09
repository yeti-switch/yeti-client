import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';

import NetworkDetails from '../NetworkDetails.vue';
import VerticalListAnt from '@/components/VerticalListAnt/VerticalListAnt';
import { COMMON_TABLE_ENTITY_EXCLUDED_FIELDS, NETWORK_DETAILS } from '@/constants';

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  params: {
    id: 'someId',
  },
};

describe('NetworkDetails page', () => {
  it('is instance of Vue, without correct entry in store', () => {
    const getNetworkDetails = jest.fn();
    const store = new Vuex.Store({
      getters: {
        networkDetails: () => ({
        }),
      },
      modules: {
        rates: {
          actions: {
            getNetworkDetails,
          },
        },
      },
    });

    const wrapper = shallowMount(NetworkDetails, {
      store, localVue, mocks: { $route },
    });
    expect(wrapper.findComponent(VerticalListAnt).exists()).toBeTruthy();
    expect(getNetworkDetails).toHaveBeenCalled();
  });

  it('is instance of Vue, with correct entry in store', () => {
    const getNetworkDetails = jest.fn();
    const store = new Vuex.Store({
      getters: {
        networkDetails: () => NETWORK_DETAILS,
      },
      modules: {
        rates: {
          actions: {
            getNetworkDetails,
          },
        },
      },
    });

    const wrapper = shallowMount(NetworkDetails, {
      store, localVue, mocks: { $route },
    });
    const numberOfRowsInNetworkInfo = Object.keys(NETWORK_DETAILS).length
    - COMMON_TABLE_ENTITY_EXCLUDED_FIELDS.length - 1; // one additional key for id
    expect(wrapper.findComponent(VerticalListAnt).props('dataSource').length).toBe(numberOfRowsInNetworkInfo);
  });
});
