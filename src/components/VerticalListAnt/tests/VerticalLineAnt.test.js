import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import sinon from 'sinon';
import {
  Table, Tag, Row, Col, Input, Button, List,
} from 'ant-design-vue';

import VerticalListAnt from '../VerticalListAnt.vue';

jest.useFakeTimers();

const localVue = createLocalVue();

describe('VerticalListAnt', () => {
  it('empty list will be displayed with on props passed', () => {
    expect.assertions(1);

    const wrapper = shallowMount(VerticalListAnt, {
      localVue,
      stubs: {
        'a-list': List,
      },
    });

    expect(wrapper.findComponent(List)).toBeTruthy();
    wrapper.destroy();
  });

  it('will build list of items if correct prop was passed', () => {
    expect.assertions(1);

    const propsData = {
      dataSource: [{
        key: 'first',
        value: 'First item value',
      }, {
        key: 'second',
        value: 'Second item value',
      }],
    };
    const wrapper = mount(VerticalListAnt, {
      localVue,
      propsData,
      stubs: {
        'a-row': Row,
        'a-col': Col,
        'a-list': List,
        'a-list-item': List.Item,
      },
    });

    expect(wrapper.findAllComponents(List.Item).length).toBe(propsData.dataSource.length);
    wrapper.destroy();
  });
});
