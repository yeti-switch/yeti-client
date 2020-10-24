import {
  shallowMount, createLocalVue,
} from '@vue/test-utils';
import DateRangePicker from 'vue2-daterange-picker';
import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import { Button } from 'ant-design-vue';

import TimeRangeFilter from '../TimeRangeFilter.vue';
import { TIME_RANGE_FILTER } from '@/constants';

const localVue = createLocalVue();
localVue.use(Vuex);
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

const getStore = ({
  timeFilterValue = { startDate: '01-01-2019', endDate: '02-02-2019' },
  requestIsPending = false,
  filterActionSet = () => null,
  filterActionReset = () => null,
}) => new Vuex.Store({
  getters: {
    timeFilterValue: () => timeFilterValue,
    requestIsPending: () => requestIsPending,
  },
  actions: {
    [TIME_RANGE_FILTER.ACTIONS.FILTER_SET]: filterActionSet,
    [TIME_RANGE_FILTER.ACTIONS.FILTER_RESET]: filterActionReset,
  },
});

const getStubs = () => ({
  'date-range-picker': DateRangePicker,
  'a-button': Button,
});

describe('TimeRangeFilter', () => {
  it('date picker will be displayed with no props passed', () => {
    const store = getStore({});
    const stubs = getStubs();

    const wrapper = shallowMount(TimeRangeFilter, {
      store,
      localVue,
      i18n,
      stubs,
    });
    expect(wrapper.findAllComponents(DateRangePicker).length).toBe(1);
    wrapper.destroy();
  });

  it('date picker is toggled if request is still loading', async () => {
    expect.assertions(1);
    const store = getStore({
      requestIsPending: true,
    });
    const stubs = getStubs();

    const wrapper = shallowMount(TimeRangeFilter, {
      store,
      localVue,
      stubs,
      i18n,
    });

    wrapper.findComponent(DateRangePicker).vm.$emit('toggle');
    await Vue.nextTick();
    expect(wrapper.vm.$refs.picker.open).toBe(false);

    wrapper.destroy();
  });
});
