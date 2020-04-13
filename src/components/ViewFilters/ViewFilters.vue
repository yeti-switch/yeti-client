<template>
  <div class="view-filters">
    <AccountsFilter />
    <TimeRangeFilter v-if="isTimeRangeEnabled" />
  </div>
</template>

<script>
import { STATISTICS_ROUTE_NAMES, CHARTS_ROUTE_NAMES } from '@/constants';

import TimeRangeFilter from './components/TimeRangeFilter/TimeRangeFilter';
import AccountsFilter from './components/AccountsFilter/AccountsFilter';

export default {
  components: {
    TimeRangeFilter,
    AccountsFilter,
  },
  computed: {
    isTimeRangeEnabled() {
      return this.$store.state.route.name === STATISTICS_ROUTE_NAMES.CDRS
        || this.$store.state.route.name === CHARTS_ROUTE_NAMES.ACTIVE_CALLS;
    },
  },
};
</script>

<style lang="scss">
  .view-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
</style>
