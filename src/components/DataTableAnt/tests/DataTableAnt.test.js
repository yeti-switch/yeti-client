import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import sinon from 'sinon';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import {
  Table, Tag, Row, Col, Input, Button,
} from 'ant-design-vue';

import DataTableAnt from '../DataTableAnt.vue';

jest.useFakeTimers();

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({ locale: 'en', messages: { en: { message: { inputPlaceholder: 'Input', clear: 'Clear' } } } });

describe('DataTableAnt', () => {
  it('empty table will be displayed with on props passed', () => {
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => false,
      },
    });

    const wrapper = shallowMount(DataTableAnt, {
      store,
      localVue,
      stubs: {
        'a-table': Table,
      },
    });
    expect(wrapper.findComponent(Table)).toBeTruthy();
    wrapper.destroy();
  });

  it('will react to the changes', () => {
    expect.assertions(3);

    const clock = sinon.useFakeTimers();
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => true,
      },
    });
    const getDataMock = jest.fn();
    const onLocalFilterMock = jest.fn();
    const propsData = {
      localFilterEnabled: true,
      localFilterTerm: 'user',
      onLocalFilter: onLocalFilterMock,
      getData: getDataMock,
    };

    const wrapper = mount(DataTableAnt, {
      store,
      localVue,
      propsData,
      i18n,
      stubs: {
        'a-table': Table,
        'a-tag': Tag,
        'a-row': Row,
        'a-col': Col,
        'a-input-search': Input.Search,
        'a-button': Button,
      },
    });
    const inputComponent = wrapper.findComponent(Input.Search);

    wrapper.findComponent(Table).vm.$emit('change', { current: 1 });
    expect(getDataMock).toHaveBeenCalledWith(1);

    inputComponent.vm.$emit('change', { target: { value: 'fakeSearchTerm' } });
    clock.tick(500);
    expect(onLocalFilterMock).toHaveBeenCalledWith('fakeSearchTerm');

    inputComponent.findComponent(Button).vm.$emit('mousedown', { stopPropagation: () => null });
    expect(onLocalFilterMock).toHaveBeenCalledTimes(2);

    wrapper.destroy();
    clock.restore();
  });
});
