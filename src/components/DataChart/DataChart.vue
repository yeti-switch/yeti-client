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
    ...mapGetters(['navOpened']),
  },
  watch: {
    navOpened() {
      this.$data._chart.resize(); // eslint-disable-line no-underscore-dangle
    },
  },
  mounted() {
    this.addPlugin(Downsample);
    this.renderChart(this.chartData, this.options);
  },
};
</script>
