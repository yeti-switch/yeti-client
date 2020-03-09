<template>
  <data-chart
    v-if="!isRequestPending"
    :chart-data="derivedChartData"
    :options="chartOptions"
    :height="null"
    :width="null"
  />
</template>

<script>

import { ACTIVE_CALLS } from '../../constants';
import DataChart from '../DataChart/DataChart';

export default {
  components: {
    dataChart: DataChart,
  },
  data() {
    return {
      currentXLength: 500,
      currentThreshold: 300,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        elements: {
          line: {
            tension: 0,
          },
          point: {
            radius: 0, // disable points
          },
        },
        scales: {
          xAxes: [{
            type: 'time',
            position: 'bottom',
            // bounds: 'ticks',
            ticks: {
              major: {
                enabled: true,
              },
              maxRotation: 0,
              autoSkipPadding: 60,
            },
            time: {
              displayFormats: {
                hour: 'HH:mm',
                day: 'MM-DD-YY HH:mm',
              },
              // round: true,
              minUnit: 'hour',
            },
            scaleLabel: {
              display: true,
              labelString: 'Time',
            },
          }],
          yAxes: [{
            id: 0,
            type: 'linear',
            position: 'left',
            ticks: {
              maxRotation: 0,
              suggestedMin: 0,
              // suggestedMax: 110,
            },
          }],
        },
        animation: {
          duration: 0,
        },
        downsample: {
          enabled: true,
          threshold: 300, // change this

          auto: false,
          onInit: true,

          preferOriginalData: true,
          restoreOriginalData: false,
        },
      },
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
        chartData.datasets.push({
          label: 'Originated calls', data: [], backgroundColor: 'transparent', borderColor: 'lightgreen',
        });
        chartData.datasets.push({
          label: 'Terminated calls',
          data: [],
          backgroundColor: 'transparent',
          borderColor: 'lightblue',
        });

        this.$store.getters.activeCalls.originatedCalls.forEach((originatedCall) => {
          chartData.datasets[0].data.push({
            y: originatedCall.x, x: Date.parse(originatedCall.y),
          });
        });

        this.$store.getters.activeCalls.terminatedCalls.forEach((terminatedCall) => {
          chartData.datasets[1].data.push({
            y: terminatedCall.x, x: Date.parse(terminatedCall.y),
          });
        });
      }


      return chartData;
    },
  },
  created() {
    this.getActiveCalls();
  },
  methods: {
    getActiveCalls() {
      this.$store.dispatch(ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS);
    },
  },
};
</script>
