import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import StatisticsCharts from '../StatisticsCharts.vue';
import DataChart from '@/components/DataChart/DataChart';

// const i18n = new VueI18n({ locale: 'en' });
// const i18n = new VueI18n();

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);

xdescribe('StatisticsCharts page', () => {
  it('is instance of Vue, with no statistics entries in store', () => {
    const getStatistics = jest.fn();
    const store = new Vuex.Store({
      getters: {
        requestIsPending: () => false,
        activeAccount: () => ({ id: 'someId' }),
        activeCalls: () => undefined,
        originatedCps: () => undefined,
      },
      modules: {
        statisticsCharts: {
          actions: {
            getStatistics,
          },
        },
      },
    });

    shallowMount(StatisticsCharts, { store, localVue, i18n });
    expect(getStatistics).toHaveBeenCalled();
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

    const wrapper = shallowMount(StatisticsCharts, { store, localVue, i18n });

    expect(wrapper.findAllComponents(DataChart).length).toBe(2);
  });
});
