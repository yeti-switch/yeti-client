<template>
  <div class="view-filters mb-3">
    <AccountsFilter />
    <TimeRangeFilter v-if="isTimeRangeEnabled" />
  </div>
</template>

<script>
import { ACCOUNT_INFO_ROUTE_NAMES } from '@/constants';

import TimeRangeFilter from './components/TimeRangeFilter/TimeRangeFilter';
import AccountsFilter from './components/AccountsFilter/AccountsFilter';

export default {
  components: {
    TimeRangeFilter,
    AccountsFilter,
  },
  computed: {
    isTimeRangeEnabled() {
      return this.$store.state.route.name === ACCOUNT_INFO_ROUTE_NAMES.CDRS
        || this.$store.state.route.name === ACCOUNT_INFO_ROUTE_NAMES.STATISTICS;
    },
  },
};
</script>

<style lang="scss">
  .view-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
