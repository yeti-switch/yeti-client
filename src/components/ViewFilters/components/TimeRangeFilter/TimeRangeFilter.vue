<i18n>
{
  "en": {
    "timeInterval": "Time interval:",
    "reset": "Reset"
  },
  "ua": {
    "timeInterval": "Інтервал часу:",
    "reset": "Скинути"
  }
}
</i18n>

<template>
  <div class="time-range-filter">
    {{ $t('timeInterval') }}
    <date-range-picker
      ref="picker"
      :date-range="timeFilterValue"
      :opens="settings.opens"
      :locale-data="settings.localeData"
      :time-picker="settings.timePicker"
      :auto-apply="settings.autoApply"
      :date-util="settings.dateUtil"
      :linked-calendars="settings.linkedCalendars"
      :ranges="ranges"
      @toggle="toggleIfNotLoading"
      @update="filterSet"
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
    <a-button
      variant="light"
      size="large"
      :disabled="requestIsPending"
      @click="filterReset"
    >
      {{ $t('reset') }}
    </a-button>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import { mapGetters, mapActions } from 'vuex';

import utils from '@/utils';
import { TIME_RANGE_FILTER } from '@/constants';

import locale from './locale';

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
            applyLabel: locale.messages[this.$i18n.locale].message.applyLabel,
            cancelLabel: locale.messages[this.$i18n.locale].message.cancelLabel,
            daysOfWeek: locale.messages[this.$i18n.locale].message.daysOfWeek,
            monthNames: locale.messages[this.$i18n.locale].message.monthNames,
          },
        };
      },
    },
  },
  computed: {
    ...mapGetters(['timeFilterValue', 'requestIsPending']),
    ranges() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      return {
        [locale.messages[this.$i18n.locale].message.today]: [today, today],
        [locale.messages[this.$i18n.locale].message.yesterday]: [yesterday, yesterday],
        [locale.messages[this.$i18n.locale].message.thisMonth]: [thisMonthStart, thisMonthEnd],
        [locale.messages[this.$i18n.locale].message.thisYear]:
          [new Date(today.getFullYear(), 0, 1), new Date(today.getFullYear(), 11, 31)],
        [locale.messages[this.$i18n.locale].message.lastMonth]:
          [
            new Date(today.getFullYear(), today.getMonth() - 1, 1),
            new Date(today.getFullYear(), today.getMonth(), 0),
          ],
      };
    },
  },
  methods: {
    ...mapActions([TIME_RANGE_FILTER.ACTIONS.FILTER_SET, TIME_RANGE_FILTER.ACTIONS.FILTER_RESET]),
    toggleIfNotLoading() {
      if (this.requestIsPending) {
        this.$refs.picker.open = false;
      }
    },
  },
};
</script>

<style lang="scss">
.time-range-filter {
  text-align: left;
  padding: 0 0 10px 15px;

  .calendars {
    display: flex;

    .calendar-time {
      display: flex;
      justify-content: center;

      select {
        margin: 0;
      }
    }
  }
}
.form-control {
  color: #495057;
  line-height: 1.5;
  font-weight: 400;
}
.time-range-filter .form-control {
  font-size: 0.9rem;
  text-align: center;
}
</style>
