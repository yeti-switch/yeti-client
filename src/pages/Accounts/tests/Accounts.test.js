import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import { ACCOUNT_DETAILS, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';
import VerticalListAnt from '@/components/VerticalListAnt/VerticalListAnt';
import Accounts from '../Accounts.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en' });

describe('Accounts page', () => {
  let storeParams;
  let getAccountDetails;

  beforeEach(() => {
    getAccountDetails = jest.fn();
    storeParams = {
      getters: {
        activeAccount: () => ({ id: 'someId' }),
        accounts: () => ([]),
        currentAccountDetails: () => (ACCOUNT_DETAILS),
      },
      modules: {
        accounts: {
          actions: {
            getAccountDetails,
          },
        },
      },
    };
  });

  afterEach(() => {
    getAccountDetails = undefined;
    storeParams = undefined;
  });

  it('calls getAccountDetails endpoint on created, if active account is set', () => {
    expect.assertions(1);

    const store = new Vuex.Store(storeParams);

    shallowMount(Accounts, { store, localVue, i18n });

    expect(getAccountDetails).toHaveBeenCalled();
  });

  it('do not call getAccountDetails if account is not set', () => {
    expect.assertions(1);

    const adjustedStoreParams = {
      ...storeParams,
      getters: {
        ...storeParams.getters,
        activeAccount: () => null,
      },
    };
    const store = new Vuex.Store(adjustedStoreParams);
    shallowMount(Accounts, { store, localVue, i18n });
    expect(getAccountDetails).toHaveBeenCalledTimes(0);
  });

  it('renders VerticalListAnt component with proper dataSource prop', () => {
    expect.assertions(1);

    const store = new Vuex.Store(storeParams);
    const wrapper = shallowMount(Accounts, { store, localVue, i18n });
    const numberOfRowsInAccountInfo = Object.keys(ACCOUNT_DETAILS).length
    - COMMON_TABLE_ENTITY_EXCLUDED_FIELDS.length;

    expect(wrapper.findComponent(VerticalListAnt).props('dataSource').length).toBe(numberOfRowsInAccountInfo);
  });

  it('calls getAccountDetails if active account is changed', () => {
    expect.assertions(1);

    const store = new Vuex.Store(storeParams);
    const component = shallowMount(Accounts, { store, localVue, i18n });

    component.vm.$options.watch.activeAccount.call(component.vm);

    expect(getAccountDetails).toHaveBeenCalledTimes(2);
  });
});
