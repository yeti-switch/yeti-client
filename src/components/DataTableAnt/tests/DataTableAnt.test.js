import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { Table, Tag } from 'ant-design-vue';

import DataTableAnt from '../DataTableAnt.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DataTableAnt', () => {
  it('is instance of Vue, with no entries passed as propsData', () => {
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => false,
      },
    });

    const wrapper = mount(DataTableAnt, {
      store,
      localVue,
      stubs: {
        'a-table': Table,
      },
    });
    expect(wrapper.findComponent(Table)).toBeTruthy();
    wrapper.destroy();
  });
  it('is instance of Vue, with correct entries passed as propsData', () => {
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => false,
      },
    });

    const propsData = {
      fields: [
        {
          key: 'name',
          dataIndex: 'name',
          title: 'Name',
        },
        {
          key: 'surname',
          dataIndex: 'surname',
          title: 'Surname',
        },
      ],
      items: [
        {
          name: 'Ivan',
          key: 'Ivan',
          surname: 'Ivanoff',
        },
        {
          name: 'Andrzej',
          key: 'Andrzej',
          surname: 'Kowalski',
        },
        {
          name: 'John',
          key: 'John',
          surname: 'Dou',
        },
      ],
      rows: 2,
    };

    const wrapper = mount(DataTableAnt, {
      store,
      localVue,
      propsData,
      stubs: {
        'a-table': Table,
      },
    });
    expect(wrapper.findAll('tr').length).toBe(4); // Data + one tr for header
    expect(wrapper.findAll('td').at(4).text()).toBe('John');
    wrapper.destroy();
  });
  it('is instance of Vue, with correct entries passed as propsData, with tagged column', () => {
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => false,
      },
    });

    const propsData = {
      fields: [
        {
          key: 'name',
          dataIndex: 'name',
          title: 'Name',
        },
        {
          key: 'surname',
          dataIndex: 'surname',
          title: 'Surname',
        },
        {
          key: 'is-admin',
          dataIndex: 'is-admin',
          title: 'Is admin',
          scopedSlots: {
            customRender: 'badge',
          },
        },
      ],
      items: [
        {
          name: 'Ivan',
          key: 'Ivan',
          surname: 'Ivanoff',
          'is-admin': 'No',
        },
        {
          name: 'Andrzej',
          key: 'Andrzej',
          surname: 'Kowalski',
          'is-admin': 'No',
        },
        {
          name: 'John',
          key: 'John',
          surname: 'Dou',
          'is-admin': 'Yes',
        },
      ],
      rows: 3,
    };

    const wrapper = mount(DataTableAnt, {
      store,
      localVue,
      propsData,
      stubs: {
        'a-table': Table,
        'a-tag': Tag,
      },
    });
    expect(wrapper.findAll('.ant-tag-volcano').length).toBe(2);
    wrapper.destroy();
  });
});
