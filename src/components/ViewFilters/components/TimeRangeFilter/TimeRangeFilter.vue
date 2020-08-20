<template>
  <div class="time-range-filter">
    {{ $t('message.timeInterval') }}
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
      {{ $t('message.reset') }}
    </a-button>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import { mapGetters, mapActions } from 'vuex';

import utils from '@/utils';
import { TIME_RANGE_FILTER } from '@/constants';

import locale from './locale';
import { DEFAULT_PROPS } from './constants';
import { getLocalePartOfSettings, getLocaleRanges } from './helpers';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: 'TimeRangeFilter',
  i18n: locale,
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
          ...DEFAULT_PROPS,
          localeData: getLocalePartOfSettings(locale, this.$i18n.locale),
        };
      },
    },
  },
  computed: {
    ...mapGetters(['timeFilterValue', 'requestIsPending']),
    ranges() {
      return getLocaleRanges(locale, this.$i18n.locale);
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
