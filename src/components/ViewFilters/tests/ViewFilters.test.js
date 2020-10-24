import {
  shallowMount, createLocalVue,
} from '@vue/test-utils';
import {
  Layout,
} from 'ant-design-vue';
import VueI18n from 'vue-i18n';

import ViewFilters from '../ViewFilters.vue';
import { ACCOUNT_INFO_ROUTE_NAMES } from '@/constants';
import TimeRangeFilter from '../components/TimeRangeFilter/TimeRangeFilter';
import AccountsFilter from '../components/AccountsFilter/AccountsFilter';

const localVue = createLocalVue();
localVue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        timeInterval: 'timeInterval',
        reset: 'reset',
      },
    },
  },
});

const getStubs = () => ({
  'a-layout-header': Layout.Header,
});

describe('ViewFilters', () => {
  it('show AccountsFilter, and TimeRangeFilter if on condition is met', () => {
    const $route = {
      name: ACCOUNT_INFO_ROUTE_NAMES.CDRS,
    };

    const stubs = getStubs();

    const wrapper = shallowMount(ViewFilters, {
      localVue,
      stubs,
      i18n,
      mocks: { $route },
    });
    expect(wrapper.findAllComponents(AccountsFilter).length).toBe(1);
    expect(wrapper.findAllComponents(TimeRangeFilter).length).toBe(1);
    wrapper.destroy();
  });
});
