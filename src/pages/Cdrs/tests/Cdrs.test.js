import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import Cdrs from '../Cdrs.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en' });

describe('Cdrs page', () => {
  let getCdrs;
  let storeParams;

  beforeEach(() => {
    getCdrs = jest.fn();
    storeParams = {
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
    };
  });

  afterEach(() => {
    getCdrs = undefined;
    storeParams = undefined;
  });

  it('calls getCdrs on created, if account is set', () => {
    expect.assertions(1);

    const store = new Vuex.Store(storeParams);

    shallowMount(Cdrs, {
      store,
      localVue,
      i18n,
    });
    expect(getCdrs).toHaveBeenCalled();
  });

  it('do not call getCdrs if account is not set', () => {
    expect.assertions(1);

    const store = new Vuex.Store({
      ...storeParams,
      getters: {
        ...storeParams.getters,
        activeAccount: () => null,
      },
    });

    shallowMount(Cdrs, {
      store,
      localVue,
      i18n,
    });
    expect(getCdrs).toHaveBeenCalledTimes(0);
  });

  it('calls getCdrs if active account is changed', () => {
    expect.assertions(1);

    const store = new Vuex.Store(storeParams);
    const component = shallowMount(Cdrs, { store, localVue, i18n });

    component.vm.$options.watch.activeAccount.call(component.vm);

    expect(getCdrs).toHaveBeenCalledTimes(2);
  });
});
