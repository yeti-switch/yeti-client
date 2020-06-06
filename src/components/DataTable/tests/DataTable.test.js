import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import {
  BTable, BProgress, BPagination, BBadge,
} from 'bootstrap-vue';

import DataTable from '../DataTable.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DataTable page', () => {
  it('is instance of Vue, with no entries passed as propsData', () => {
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => false,
      },
    });

    const wrapper = mount(DataTable, {
      store,
      localVue,
      stubs: {
        'b-table': BTable,
        'b-pagination': BPagination,
        'b-progress': BProgress,
      },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
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
          lable: 'Name',
        },
        {
          key: 'surname',
          label: 'Surname',
        },
      ],
      items: [
        {
          name: 'Ivan',
          surname: 'Ivanoff',
        },
        {
          name: 'Andrzej',
          surname: 'Kowalski',
        },
        {
          name: 'John',
          surname: 'Dou',
        },
      ],
      rows: 2,
    };

    const wrapper = mount(DataTable, {
      store,
      localVue,
      propsData,
      stubs: {
        'b-table': BTable,
        'b-pagination': BPagination,
        'b-progress': BProgress,
      },
    });
    expect(wrapper.findAll('tr').length).toBe(4); // Data + one tr for header
    expect(wrapper.findAll('td').at(4).text()).toBe('John');
  });
  it('is instance of Vue, with correct entries passed as propsData, with badged column', () => {
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => false,
      },
    });

    const propsData = {
      fields: [
        {
          key: 'name',
          lable: 'Name',
        },
        {
          key: 'surname',
          label: 'Surname',
        },
        {
          key: 'is-admin',
          label: 'Is admin',
        },
      ],
      items: [
        {
          name: 'Ivan',
          surname: 'Ivanoff',
          'is-admin': 'No',
        },
        {
          name: 'Andrzej',
          surname: 'Kowalski',
          'is-admin': 'No',
        },
        {
          name: 'John',
          surname: 'Dou',
          'is-admin': 'Yes',
        },
      ],
      rows: 3,
      itemsToBadge: [{
        id: 'is-admin',
        errorValue: 'No',
      }],
    };

    const wrapper = mount(DataTable, {
      store,
      localVue,
      propsData,
      stubs: {
        'b-table': BTable,
        'b-pagination': BPagination,
        'b-progress': BProgress,
        'b-badge': BBadge,
      },
    });
    expect(wrapper.findAll('.badge-pill').length).toBe(2);
  });
});
