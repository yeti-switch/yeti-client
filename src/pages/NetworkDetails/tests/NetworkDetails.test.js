import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import NetworkDetails from '../NetworkDetails.vue';
import VerticalListAnt from '@/components/VerticalListAnt/VerticalListAnt';
import { COMMON_TABLE_ENTITY_EXCLUDED_FIELDS, NETWORK_DETAILS } from '@/constants';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en', messages: { en: { message: { networkDetails: 'ALBANIA' } } } });

const $route = {
  params: {
    id: 'someId',
  },
};

describe('NetworkDetails page', () => {
  let storeParams;
  let getNetworkDetails;

  beforeEach(() => {
    getNetworkDetails = jest.fn();
    storeParams = {
      getters: {
        networkDetails: () => ({}),
      },
      modules: {
        networkDetails: {
          actions: {
            getNetworkDetails,
          },
        },
      },
    };
  });

  afterEach(() => {
    getNetworkDetails = undefined;
    storeParams = undefined;
  });

  it('calls getNetworkDetails on created', () => {
    expect.assertions(1);

    const store = new Vuex.Store(storeParams);
    shallowMount(NetworkDetails, {
      store, localVue, i18n, mocks: { $route },
    });

    expect(getNetworkDetails).toHaveBeenCalledWith(expect.anything(), $route.params.id);
  });

  it('builds VerticalListAnt with proper dataSource prop', () => {
    expect.assertions(1);

    const adjustedStoreParams = {
      ...storeParams,
      getters: {
        ...storeParams.getters, networkDetails: () => NETWORK_DETAILS,
      },
    };
    const store = new Vuex.Store(adjustedStoreParams);
    const wrapper = shallowMount(NetworkDetails, {
      store, localVue, i18n, mocks: { $route },
    });
    const numberOfRowsInNetworkInfo = Object.keys(NETWORK_DETAILS).length
    - COMMON_TABLE_ENTITY_EXCLUDED_FIELDS.length - 1; // one additional key for id

    expect(wrapper.findComponent(VerticalListAnt).props('dataSource').length).toBe(numberOfRowsInNetworkInfo);
  });
});
