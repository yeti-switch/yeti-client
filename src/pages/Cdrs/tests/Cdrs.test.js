import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import Cdrs from '../Cdrs.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en' });

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
      i18n,
    });
    expect(getCdrs).toHaveBeenCalled();
  });
});
