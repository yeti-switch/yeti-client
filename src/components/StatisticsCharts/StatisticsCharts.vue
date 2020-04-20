<template>
  <div>
    <data-chart
      v-if="!isRequestPending"
      :chart-data="derivedChartData"
      :options="chartOptions"
      :height="null"
      :width="null"
    />
  </div>
</template>

<script>

import { STATISTICS } from '@/constants';

import { CHART_OPTIONS, INITIAL_DATASETS_SETTINGS } from './fixtures';
import DataChart from '../DataChart/DataChart';

export default {
  components: {
    dataChart: DataChart,
  },
  data() {
    return {
      currentXLength: 500,
      currentThreshold: 300,
      chartOptions: CHART_OPTIONS,
      chart: undefined,
    };
  },
  computed: {
    isRequestPending() {
      return this.$store.getters.requestIsPending;
    },
    derivedChartData() {
      const chartData = {
        datasets: [],
      };

      if (this.$store.getters.activeCalls) {
        // For some reason, pushing dataset configs in scope of below Object.keys
        // cause continous dataset refresh, which results in page crash
        chartData.datasets.push({
          label: 'Originated calls',
          data: [],
          backgroundColor: 'transparent',
          borderColor: 'lightgreen',
        });
        chartData.datasets.push({
          label: 'Terminated calls',
          data: [],
          backgroundColor: 'transparent',
          borderColor: 'lightblue',
        });

        Object.keys(INITIAL_DATASETS_SETTINGS).forEach((key, index) => {
          this.$store.getters.activeCalls[key].forEach((dataEntry) => {
            chartData.datasets[index].data.push({
              y: dataEntry.y, x: Date.parse(dataEntry.x),
            });
          });
        });
      }

      return chartData;
    },
  },
  created() {
    this.getStatistics();
  },
  methods: {
    getStatistics() {
      this.$store.dispatch(STATISTICS.ACTIONS.GET_STATISTICS);
    },
  },
};
</script>
