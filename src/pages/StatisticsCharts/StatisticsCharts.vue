<template>
  <div>
    <data-chart
      v-if="!requestIsPending"
      :chart-data="activeCallsData"
      :options="chartOptions"
      :height="chartHeight"
      :width="null"
    />
    <data-chart
      v-if="!requestIsPending"
      :chart-data="originatedCpsData"
      :options="chartOptions"
      :height="chartHeight"
      :width="null"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import DataChart from '@/components/DataChart/DataChart';
import { STATISTICS } from '@/constants';

import { CHART_OPTIONS, INITIAL_DATASETS_SETTINGS } from './constants';

export default {
  name: 'StatisticsCharts',
  components: {
    dataChart: DataChart,
  },
  data() {
    return {
      chartOptions: CHART_OPTIONS,
      chart: undefined,
      chartHeight: (document.body.clientHeight - 100) / 2,
    };
  },
  computed: {
    ...mapGetters(['requestIsPending', 'activeAccount', 'activeCalls', 'originatedCps']),
    derivedCharData() {
      if (this.activeCalls && this.originatedCps) {
        const chartsData = { ...this.activeCalls, ...this.originatedCps };

        return Object.entries(INITIAL_DATASETS_SETTINGS).reduce((acc, [key, value]) => {
          acc[key] = {
            ...value,
            data: chartsData[key].map(({ x, y }) => ({ y, x: Date.parse(x) })),
          };

          return acc;
        }, {});
      }

      return { cps: { data: [] }, activeCalls: { data: [] }, originatedCps: { data: [] } };
    },
    originatedCpsData() {
      return { datasets: [this.derivedCharData.cps] };
    },
    activeCallsData() {
      return { datasets: Object.entries(this.derivedCharData).filter(([key]) => key !== 'cps').map(([, value]) => value) };
    },
  },
  watch: {
    activeAccount() {
      this[STATISTICS.ACTIONS.GET_STATISTICS]();
    },
  },
  created() {
    if (this.activeAccount) {
      this[STATISTICS.ACTIONS.GET_STATISTICS]();
    }
  },
  methods: {
    ...mapActions([STATISTICS.ACTIONS.GET_STATISTICS]),
  },
};
</script>
