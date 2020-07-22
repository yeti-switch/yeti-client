<template>
  <div>
    <data-chart
      v-if="!requestIsPending"
      :chart-data="derivedActiveCallsChartData"
      :options="chartOptions"
      :height="chartHeight"
      :width="null"
    />
    <data-chart
      v-if="!requestIsPending"
      :chart-data="derivedOriginatedCpsChartData"
      :options="chartOptions"
      :height="chartHeight"
      :width="null"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      chartHeight: 0,
    };
  },
  computed: {
    ...mapGetters(['requestIsPending', 'activeAccount']),
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
  watch: {
    activeAccount() {
      this.$store.dispatch(STATISTICS.ACTIONS.GET_STATISTICS);
    },
  },
  mounted() {
    // 100 is kinda magic number which will gave us nice chart height
    this.chartHeight = (document.querySelector('.working-area-wrapper').clientHeight - 100) / 2;
  },
  created() {
    if (this.activeAccount) {
      this.$store.dispatch(STATISTICS.ACTIONS.GET_STATISTICS);
    }
  },
};
</script>
