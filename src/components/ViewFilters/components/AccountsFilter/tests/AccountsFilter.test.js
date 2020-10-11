import {
  shallowMount, createLocalVue,
} from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import {
  Button,
  Dropdown,
  Menu,
  Row,
} from 'ant-design-vue';

import AccountsFilter from '../AccountsFilter.vue';
import { ACCOUNTS } from '@/constants';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        account: 'account',
      },
    },
  },
});

const getStore = ({
  activeAccount = null,
  accounts = [],
  getAccountsActon = () => null,
  setAccountIdAction = () => null,
}) => new Vuex.Store({
  getters: {
    activeAccount: () => activeAccount,
    accounts: () => accounts,
  },
  actions: {
    [ACCOUNTS.ACTIONS.GET_ACCOUNTS]: getAccountsActon,
    [ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID]: setAccountIdAction,
  },
});

const getStubs = () => ({
  'a-menu': Menu,
  'a-row': Row,
  'a-button': Button,
  'a-dropdown': Dropdown,
  'a-menu-item': Menu.Item,
  'a-icon': { template: '<i></i>' },
});

describe('AccountsFilter', () => {
  it('no dropdown will be displayed with no props passed', () => {
    const store = getStore({});
    const stubs = getStubs();

    const wrapper = shallowMount(AccountsFilter, {
      store,
      localVue,
      i18n,
      stubs,
    });
    expect(wrapper.findAllComponents(Dropdown).length).toBe(0);
    wrapper.destroy();
  });

  it('show dd with items if some account is active', () => {
    expect.assertions(3);
    const store = getStore({
      accounts: [
        { id: 'first_acc', name: 'firstAccName' },
        { id: 'second_acc', name: 'secondAccName' },
      ],
      activeAccount: { id: 'first_acc', name: 'firstAccName' },
    });
    const stubs = getStubs();

    const wrapper = shallowMount(AccountsFilter, {
      store,
      localVue,
      stubs,
      i18n,
    });

    expect(wrapper.findAllComponents(Dropdown).length).toBe(1);
    expect(wrapper.findAllComponents(Menu.Item).length).toBe(2);
    expect(wrapper.findComponent(Row).find('span').text()).toBe('firstAccName');
    wrapper.destroy();
  });

  it('will call store actions on an appropriate events', async () => {
    expect.assertions(3);

    const fakeSetAccountIdAction = jest.fn();

    const store = getStore({
      setAccountIdAction: fakeSetAccountIdAction,
      accounts: [
        { id: 'first_acc', name: 'firstAccName' },
        { id: 'second_acc', name: 'secondAccName' },
      ],
      activeAccount: { id: 'first_acc', name: 'firstAccName' },
    });
    const stubs = getStubs();

    const wrapper = shallowMount(AccountsFilter, {
      store,
      localVue,
      stubs,
      i18n,
    });

    wrapper.findComponent(Dropdown).vm.$emit('visibleChange', true);
    await Vue.nextTick();
    expect(wrapper.vm.$data.visible).toBe(true);

    wrapper.findComponent(Menu).vm.$emit('click', { key: 'someKey' });
    await Vue.nextTick();
    expect(fakeSetAccountIdAction).toHaveBeenCalledWith(expect.anything(), 'someKey');

    wrapper.findComponent(Menu).vm.$emit('click', { key: 'first_acc' });
    await Vue.nextTick();
    expect(fakeSetAccountIdAction).toHaveBeenCalledTimes(1);

    wrapper.destroy();
  });
});
