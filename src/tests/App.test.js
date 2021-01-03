import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import App from '../App.vue';
import { AUTH } from '@/constants';

const mockInsertNetworkErrorMiddleware = jest.fn(() => true);
const mockInsertNetworkAuthErrorMiddleware = jest.fn(() => true);
const fakePush = jest.fn();

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      insertNetworkErrorMiddleware: mockInsertNetworkErrorMiddleware,
      insertNetworkAuthErrorMiddleware: mockInsertNetworkAuthErrorMiddleware,
    };
  },
}));

const $router = {
  push: fakePush,
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en', messages: { en: { message: { inputPlaceholder: 'Input', clear: 'Clear' } } } });

describe('App', () => {
  it('empty App will be displayed with no props passed', () => {
    const localAuthMock = jest.fn();
    const store = new Vuex.Store({
      getters: {
        locale: () => 'en',
      },
      actions: {
        [AUTH.ACTIONS.LOCAL_AUTH]: localAuthMock,
      },
    });

    const wrapper = shallowMount(App, {
      store,
      localVue,
      i18n,
      stubs: {
        notifications: { template: '<div></div>' },
        'router-view': { template: '<div></div>' },
      },
      mocks: {
        $router,
      },
    });
    expect(localAuthMock).toHaveBeenCalledTimes(1);
    expect(mockInsertNetworkErrorMiddleware).toHaveBeenCalledTimes(1);
    expect(mockInsertNetworkAuthErrorMiddleware).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });
});
