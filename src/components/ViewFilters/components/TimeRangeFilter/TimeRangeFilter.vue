<template>
  <div class="time-range-filter">
    Time interval:
    <date-range-picker
      ref="picker"
      :date-range="timeFilterValue"
      :opens="settings.opens"
      :locale-data="settings.localeData"
      :time-picker="settings.timePicker"
      :auto-apply="settings.autoApply"
      :date-util="settings.dateUtil"
      :linked-calendars="settings.linkedCalendars"
      @toggle="toggleIfNotLoading"
      @update="updateValues"
    >
      >
      <div
        slot="input"
        slot-scope="picker"
        style="min-width: 250px;"
      >
        {{ picker.startDate | date }} - {{ picker.endDate | date }}
      </div>
    </date-range-picker>
    <b-button
      type="reset"
      variant="light"
      size="sm"
      class="ml-2"
      :disabled="requestIsPending"
      @click="onResetClick"
    >
      Reset
    </b-button>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import { mapGetters } from 'vuex';

import utils from '@/utils';
import { TIME_RANGE_FILTER } from '@/constants';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: 'TimeRangeFilter',
  components: {
    DateRangePicker,
  },
  filters: {
    date(dateStr) {
      return utils.formatDateFromObject(dateStr);
    },
  },
  props: {
    settings: {
      type: Object,
      default() {
        return {
          opens: 'left',
          timePicker: true,
          linkedCalendars: false,
          dateUtil: 'moment',
          localeData: {
            firstDay: 1,
            format: 'DD-MM-YYYY HH:mm:ss',
            applyLabel: 'Filter',
          },
        };
      },
    },
  },
  computed: {
    ...mapGetters(['timeFilterValue', 'requestIsPending']),
  },
  methods: {
    updateValues(value) {
      this.$store.dispatch(TIME_RANGE_FILTER.ACTIONS.FILTER_SET, value);
    },
    onResetClick() {
      this.$store.dispatch(TIME_RANGE_FILTER.ACTIONS.FILTER_RESET);
    },
    toggleIfNotLoading() {
      if (this.requestIsPending) {
        this.$refs.picker.open = false;
      }
    },
  },
};
</script>

<style>
.time-range-filter {
  text-align: left;
  padding: 0 0 10px 15px;
}
.time-range-filter .form-control {
  font-size: 0.9rem;
  text-align: center;
}
</style>
