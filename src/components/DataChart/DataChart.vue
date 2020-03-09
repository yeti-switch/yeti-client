<script>
import { Line, mixins } from 'vue-chartjs';
import Downsample from 'chartjs-plugin-downsample';

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    this.addPlugin(Downsample);
    this.renderChart(this.chartData, this.options);
  },
};
</script>
