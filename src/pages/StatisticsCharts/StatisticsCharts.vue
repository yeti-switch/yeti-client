<template>
  <div>
    <data-chart
      v-if="!requestIsPending"
      :chart-data="derivedActiveCallsChartData"
      :options="chartOptions"
      :height="null"
      :width="null"
    />
    <data-chart
      v-if="!requestIsPending"
      :chart-data="derivedOriginatedCpsChartData"
      :options="chartOptions"
      :height="null"
      :width="null"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DataChart from '@/components/DataChart/DataChart';

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
    };
  },
  computed: {
    ...mapGetters(['requestIsPending']),
    derivedActiveCallsChartData() {
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
            const { x, y } = dataEntry;

            chartData.datasets[index].data.push({
              y, x: Date.parse(x),
            });
          });
        });
      }

      return chartData;
    },
    derivedOriginatedCpsChartData() {
      const chartData = {
        datasets: [],
      };

      if (this.$store.getters.originatedCps) {
        // For some reason, pushing dataset configs in scope of below Object.keys
        // cause continous dataset refresh, which results in page crash
        chartData.datasets.push({
          label: 'Originated CPS',
          data: this.$store.getters.originatedCps.cps.map(({ x, y }) =>
            ({ y, x: Date.parse(x) })),
          backgroundColor: 'transparent',
          borderColor: 'orange',
        });
      }

      return chartData;
    },
  },
};
</script>
