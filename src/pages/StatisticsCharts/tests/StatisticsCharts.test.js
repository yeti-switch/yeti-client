import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import StatisticsCharts from '../StatisticsCharts.vue';
import DataChart from '@/components/DataChart/DataChart';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('StatisticsCharts page', () => {
  it('is instance of Vue, with no statistics entries in store', () => {
    const getStatistics = jest.fn();
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => false,
        activeAccount: () => ({ id: 'someId' }),
      },
      modules: {
        statisticsCharts: {
          actions: {
            getStatistics,
          },
        },
      },
    });

    const wrapper = shallowMount(StatisticsCharts, { store, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('builds two charts if there are statistics entries in store', () => {
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => false,
        activeAccount: () => ({ id: 'someId' }),
        activeCalls: () => (
          {
            terminatedCalls: [{ y: 12, x: 1000000000 }],
            originatedCalls: [{ y: 34, x: 2000000000 }],
          }
        ),
        originatedCps: () => ({
          cps: [{ y: 1234, x: 3000000000 }],
        }),
      },
      modules: {
        statisticsCharts: {
          actions: {
            getStatistics: jest.fn(),
          },
        },
      },
    });

    const wrapper = shallowMount(StatisticsCharts, { store, localVue });

    expect(wrapper.findAll(DataChart).length).toBe(2);
  });
});
