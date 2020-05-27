import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BTable } from 'bootstrap-vue';
import Vuex from 'vuex';

import NetworkDetails from '../NetworkDetails.vue';

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
      store, localVue, mocks: { $route }, stubs: { 'b-table': BTable },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(getNetworkDetails).toHaveBeenCalled();
  });

  it('is instance of Vue, with correct entry in store', () => {
    const getNetworkDetails = jest.fn();
    const store = new Vuex.Store({
      getters: {
        networkDetails: () => ({
          id: 'someId',
          links: {},
          name: 'ALBANIA',
          'network-type': 'Unknown',
          type: 'networks',
          uuid: 'someId',
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
      store, localVue, mocks: { $route }, stubs: { 'b-table': BTable },
    });
    expect(wrapper.findAll('td').length).toBe(3);
    expect(wrapper.findAll('td').at(0).find('div').text()).toBe('ALBANIA');
  });
});
