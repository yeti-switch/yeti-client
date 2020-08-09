import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Rates from '../Rates.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Rates page', () => {
  it('is instance of Vue, with no rates entries in store', () => {
    const getRates = jest.fn();
    const store = new Vuex.Store({
      getters: {
        activeAccount: () => ({ id: 'someId' }),
        rates: () => ({ items: [] }),
      },
      modules: {
        rates: {
          actions: {
            getRates,
          },
        },
      },
    });

    shallowMount(Rates, { store, localVue });
    expect(getRates).toHaveBeenCalled();
  });
});
