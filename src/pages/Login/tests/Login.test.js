import { shallowMount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import {
  Button, Form, Input, Row,
} from 'ant-design-vue';

import { NOTIFICATION_TYPES } from '@/constants';

import Login from '../Login.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        loginTitle: 'mister',
        userNameError: 'name_error',
        userName: 'name',
        passwordError: 'pass_error',
        password: 'pass',
        loginAction: 'action_login',
      },
    },
  },
});

describe('Login page', () => {
  it('loads login form', async () => {
    expect.assertions(1);

    const wrapper = shallowMount(Login, {
      localVue,
      i18n,
      stubs: {
        'a-button': Button,
        'a-form': Form,
        'a-input': Input,
        'a-form-item': Form.Item,
        // Here we're intentionally mocking icon as a button, because it's really hard to test Icon
        'a-icon': Button,
        'a-row': Row,
      },
      mocks: {

      },
    });

    expect(wrapper.findAllComponents(Form).length).toBe(1);
  });

  it('submits login form', async () => {
    expect.assertions(3);

    const authRequest = jest.fn();
    const store = new Vuex.Store({
      modules: {
        cdrs: {
          actions: {
            authRequest,
          },
        },
      },
    });
    const routerPushMock = jest.fn();
    const $router = {
      push: routerPushMock,
    };
    const $route = {
      query: {},
    };
    const $notifyMock = jest.fn();
    const wrapper = shallowMount(Login, {
      localVue,
      i18n,
      store,
      stubs: {
        'a-button': Button,
        'a-form': Form,
        'a-input': Input,
        'a-form-item': Form.Item,
        // Here we're intentionally mocking icon as a button, because it's really hard to test Icon
        'a-icon': Button,
        'a-row': Row,
      },
      mocks: {
        $router,
        $route,
        $notify: $notifyMock,
      },
    });

    const form = wrapper.findComponent(Form);

    form.findAllComponents(Input).at(0).vm.$emit('change', 'Sam');
    form.findAllComponents(Input).at(1).vm.$emit('change', 'Password of Sam');

    form.vm.$emit('submit', { preventDefault: () => null });

    await flushPromises();
    expect(authRequest).toHaveBeenCalledWith(expect.anything(), { login: 'Sam', password: 'Password of Sam' });

    await flushPromises();
    expect(routerPushMock).toHaveBeenCalledWith('/');

    await flushPromises();
    expect($notifyMock).toHaveBeenCalledWith({
      type: NOTIFICATION_TYPES.SUCCESS,
      text: 'Login successful',
    });
  });
});
