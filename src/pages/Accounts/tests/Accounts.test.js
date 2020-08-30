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
  it('is instance of Vue, with no account entries in store', () => {
    const getAccountDetails = jest.fn();
    const store = new Vuex.Store({
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
    });
    const wrapper = shallowMount(Accounts, { store, localVue, i18n });

    expect(wrapper.findComponent(VerticalListAnt).exists()).toBeTruthy();
    expect(getAccountDetails).toHaveBeenCalled();
  });

  it('renders proper number of account info entries', () => {
    const getAccountDetails = jest.fn();
    const store = new Vuex.Store({
      getters: {
        accounts: () => ([]),
        activeAccount: () => ({ id: 'someId' }),
        currentAccountDetails: () => (ACCOUNT_DETAILS),
      },
      modules: {
        accounts: {
          actions: {
            getAccountDetails,
          },
        },
      },
    });

    const wrapper = shallowMount(Accounts, { store, localVue, i18n });
    const numberOfRowsInAccountInfo = Object.keys(ACCOUNT_DETAILS).length
    - COMMON_TABLE_ENTITY_EXCLUDED_FIELDS.length;

    expect(wrapper.findComponent(VerticalListAnt).props('dataSource').length).toBe(numberOfRowsInAccountInfo);
  });
});
