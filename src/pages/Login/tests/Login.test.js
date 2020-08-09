import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { Button, Form, Input } from 'ant-design-vue';
import Item from 'ant-design-vue/lib/list/Item';

import Login from '../Login.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login page', () => {
  it('is initialized, with image flag set to loaded and form enabled', async () => {
    // const authRequest = jest.fn();
    // const store = new Vuex.Store({
    //   getters: {
    //     activeAccount: () => ({ id: 'someId' }),
    //   },
    //   modules: {
    //     cdrs: {
    //       actions: {
    //         authRequest,
    //       },
    //     },
    //   },
    // });

    const wrapper = shallowMount(Login, {
      localVue,
      stubs: {
        'a-button': Button, 'a-form': Form, 'a-input': Input, 'a-form-item': Item,
      },
    });
    expect(wrapper.vm.$data.imageLoaded).toBeFalsy();
  });
});
