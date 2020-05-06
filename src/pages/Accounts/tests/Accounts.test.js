import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVue, { BTable } from 'bootstrap-vue';

import { ACCOUNT_DETAILS } from '@/constants';
import { EXLUDED_RESPONSE_FIELDS } from '@/pages/Accounts/constants';
import Accounts from '../Accounts.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

describe('Accounts page', () => {
  it('is instance of Vue, with no account entries in store', () => {
    const getAccountDetails = jest.fn();
    const store = new Vuex.Store({
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
    expect(getAccountDetails).toHaveBeenCalled();
  });

  it('renders proper number of account info entries', () => {
    const getAccountDetails = jest.fn();
    const store = new Vuex.Store({
      getters: {
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
    - EXLUDED_RESPONSE_FIELDS.length;

    expect(wrapper.findAll('td').length).toBe(numberOfRowsInAccountInfo);
  });
});
