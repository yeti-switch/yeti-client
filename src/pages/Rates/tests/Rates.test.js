import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import Rates from '../Rates.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en' });

describe('Rates page', () => {
  it('calls getRates endpoint on created, if active account is set', () => {
    expect.assertions(1);

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

    shallowMount(Rates, {
      store,
      localVue,
      i18n,
    });
    expect(getRates).toHaveBeenCalled();
  });
});
