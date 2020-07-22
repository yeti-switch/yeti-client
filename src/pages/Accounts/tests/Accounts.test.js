import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVue, { BTable } from 'bootstrap-vue';

import { ACCOUNT_DETAILS, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';
import Accounts from '../Accounts.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

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
    const wrapper = shallowMount(Accounts, { store, localVue });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.find(BTable).exists());
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

    const wrapper = mount(Accounts, { store, localVue });
    const numberOfRowsInAccountInfo = Object.keys(ACCOUNT_DETAILS).length
    - COMMON_TABLE_ENTITY_EXCLUDED_FIELDS.length;

    expect(wrapper.findAll('td').length).toBe(numberOfRowsInAccountInfo);
  });
});
