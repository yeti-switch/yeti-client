import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Cdrs from '../Cdrs.vue';
import { mockedLocale } from '@/../test/mocks/componentLocale';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Cdrs page', () => {
  it('is instance of Vue, with no cdrs entries in store', () => {
    const getCdrs = jest.fn();
    const store = new Vuex.Store({
      getters: {
        activeAccount: () => ({ id: 'someId' }),
        cdrs: () => ({ items: [] }),
      },
      modules: {
        cdrs: {
          actions: {
            getCdrs,
          },
        },
      },
    });

    shallowMount(Cdrs, {
      store,
      localVue,
      mocks: { ...mockedLocale() },
    });
    expect(getCdrs).toHaveBeenCalled();
  });
});
