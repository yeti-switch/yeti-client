<script>
import { mapGetters } from 'vuex';
import { Line, mixins } from 'vue-chartjs';
import Downsample from 'chartjs-plugin-downsample';

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters(['navCollapsed']),
  },
  watch: {
    navCollapsed() {
      // magic timeout to resize chart after navbar was animated in or out
      setTimeout(() => {
        this.$data._chart.resize(); // eslint-disable-line no-underscore-dangle
      }, 100);
    },
  },
  mounted() {
    console.log(this.chartData.datasets[0].data);
    this.addPlugin(Downsample);
    this.renderChart(this.chartData, this.options);
  },
};
</script>
