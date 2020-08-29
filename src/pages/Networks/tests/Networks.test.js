import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import DataTableAnt from '@/components/DataTableAnt/DataTableAnt';

import Networks from '../Networks.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en' });

describe('Networks page', () => {
  it('is instance of Vue, with no networks entries in store', () => {
    const getNetworks = jest.fn();
    const store = new Vuex.Store({
      getters: {
        networks: () => ({ items: [] }),
        networksFilter: () => '',
      },
      modules: {
        networks: {
          actions: {
            getNetworks,
          },
        },
      },
    });

    shallowMount(Networks, {
      store,
      localVue,
      i18n,
    });
    expect(getNetworks).toHaveBeenCalled();
  });
  it('is instance of Vue, with proper networks entries in store', () => {
    const getNetworks = jest.fn();
    const store = new Vuex.Store({
      getters: {
        networks: () => ({
          items: [{
            id: 'fakeId1',
            links: { },
            name: 'AFGHANISTAN',
            'network-type': { name: 'Unknown' },
            type: 'networks',
          }, {
            id: 'fakeId2',
            links: { },
            name: 'ALBANIA',
            'network-type': { name: 'Known' },
            type: 'networks',
          }],
          meta: { 'total-count': 500 },
        }),
        networksFilter: () => 'alabama',
      },
      modules: {
        networks: {
          actions: {
            getNetworks,
          },
        },
      },
    });

    const wrapper = shallowMount(Networks, {
      store,
      localVue,
      i18n,
    });
    expect(wrapper.findComponent(DataTableAnt).props('localFilterTerm')).toBe('alabama');
    expect(wrapper.findComponent(DataTableAnt).props('items').length).toBe(2);
    expect(wrapper.findComponent(DataTableAnt).props('rows')).toBe(500);
  });
});
