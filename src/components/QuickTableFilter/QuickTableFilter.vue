<template>
  <div class="quickfilter-wrapper">
    <span>use quick filter by Start Time:&nbsp;</span>
    <date-range-picker
      ref="picker"
      v-model="dateRangeModel"
      :opens="settings.opens"
      :locale-data="settings.localeData"
      :time-picker="settings.timePicker"
      :auto-apply="settings.autoApply"
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
      :disabled="loading"
      @click="onResetClick"
    >
      Reset
    </b-button>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';

import utils from '../../utils';
import { CDRS } from '../../constants';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: 'QuickTableFilter',
  components: {
    DateRangePicker,
  },
  filters: {
    date(dateStr) {
      return utils.formatPickerDate(dateStr);
    },
  },
  props: {
    getData: {
      type: Function,
      default() {
        return [];
      },
    },
    onReset: {
      type: Function,
      default() {
        return undefined;
      },
    },
    dateRange: {
      type: Object,
      default() {
        return {};
      },
    },
    settings: {
      type: Object,
      default() {
        return {
          opens: 'right',
          timePicker: true,
          linkedCalendars: false,
          autoApply: true, // should be removed in case https://github.com/Innologica/vue2-daterange-picker/pull/120 will be merged
          localeData: {
            firstDay: 1,
            format: 'DD-MM-YYYY HH:mm:ss',
            applyLabel: 'Filter',
          },
        };
      },
    },
  },
  data() {
    return {
      dateRangeModel: this.$props.dateRange,
    };
  },
  computed: {
    filterValue() {
      return {
        timeStartGteq: this.$data.dateRangeModel.startDate,
        timeStartLteq: this.$data.dateRangeModel.endDate,
      };
    },
    loading() {
      return this.$store.getters.isRequestPending;
    },
  },
  methods: {
    updateValues() {
      this.$store.dispatch(CDRS.ACTIONS.SET_CDRS_FILTER, this.filterValue);

      this.$props.getData();
    },
    onResetClick() {
      this.resetCdrFilter();
      this.$props.getData();
      this.$props.onReset();
    },
    resetCdrFilter() {
      this.$store.dispatch(CDRS.ACTIONS.SET_CDRS_FILTER, this.filterValue);
    },
    toggleIfNotLoading() {
      if (this.loading) {
        this.$refs.picker.open = false;
      }
    },
  },
};
</script>

<style>
.quickfilter {
  text-align: left;
  padding: 0 0 10px 15px;
}
.quickfilter .form-control {
  font-size: 0.9rem;
  text-align: center;
}
</style>
