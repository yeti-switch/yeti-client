import {
  shallowMount, createLocalVue, RouterLinkStub,
} from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import {
  Layout, Menu,
} from 'ant-design-vue';

import NavBar from '../NavBar.vue';
import { AUTH, UI_STATE } from '@/constants';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        rates: 'Rates',
        cdrs: 'CDRS',
        account: 'account',
        networks: 'networks',
        statistics: 'statistics',
        logout: 'logout',
      },
    },
  },
});

let $route = {
  name: '',
};

const getStore = ({
  linkOnLogo = false,
  isAuthenticated = true,
  navCollapsed = false,
  blockedPages = [],
  navStateAction = () => null,
  logoutAction = () => null,
}) => new Vuex.Store({
  getters: {
    linkOnLogo: () => linkOnLogo,
    isAuthenticated: () => isAuthenticated,
    navCollapsed: () => navCollapsed,
    blockedPages: () => (new Set(blockedPages)),
  },
  actions: {
    [UI_STATE.ACTIONS.SET_NAV_STATE]: navStateAction,
    [AUTH.ACTIONS.LOGOUT]: logoutAction,
  },

});

const getStubs = () => ({
  'a-menu': Menu,
  'a-layout-sider': Layout.Sider,
  'a-menu-item': Menu.Item,
  'a-icon': { template: '<i></i>' },
  'router-link': RouterLinkStub,
});

describe('NavBar', () => {
  it('empty bar will be displayed with no props passed', () => {
    const store = getStore({});
    const stubs = getStubs();

    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      i18n,
      stubs,
      mocks: { $route },
    });
    expect(wrapper.findAllComponents(Menu).length).toBe(2);
    wrapper.destroy();
  });

  it('reacts to route change', async () => {
    expect.assertions(1);
    const store = getStore({});
    const stubs = getStubs();

    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      stubs,
      i18n,
      mocks: { $route },
    });

    $route = { name: 'cdrs' };
    wrapper.vm.$options.watch.$route.call(wrapper.vm, { name: 'cdrs' });
    await Vue.nextTick();
    expect(wrapper.findAllComponents(Menu).at(0).props('selectedKeys')).toEqual(['cdrs']);
    wrapper.destroy();
  });

  it('will call store actions on an appropriate events', async () => {
    expect.assertions(3);

    const fakeNavStateAction = jest.fn();
    const fakeLogoutAction = jest.fn();
    const fakePush = jest.fn();

    const store = getStore({
      navStateAction: fakeNavStateAction,
      logoutAction: fakeLogoutAction,
    });
    const stubs = getStubs();

    const $router = {
      push: fakePush,
    };

    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      stubs,
      i18n,
      mocks: { $route, $router },
    });

    wrapper.setData({ collapsed: true });
    expect(fakeNavStateAction).toHaveBeenCalledWith(expect.anything(), true);

    const secondMenu = wrapper.findAllComponents(Menu).at(1);
    await secondMenu.findComponent(Menu.Item).vm.$emit('click');
    await expect(fakeLogoutAction).toHaveBeenCalled();
    expect(fakePush).toHaveBeenCalled();

    wrapper.destroy();
  });
});
