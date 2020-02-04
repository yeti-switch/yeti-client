<template>
  <div class="view-filters">
    <AccountsFilter />
    <TimeRangeFilter v-if="isTimeRangeEnabled" />
  </div>
</template>

<script>
import TimeRangeFilter from './components/TimeRangeFilter/TimeRangeFilter';
import AccountsFilter from './components/AccountsFilter/AccountsFilter';
import { STATISTICS_ROUTE_NAMES } from '../../constants';

export default {
  components: {
    TimeRangeFilter,
    AccountsFilter,
  },
  computed: {
    isTimeRangeEnabled() {
      return this.$store.state.route.name === STATISTICS_ROUTE_NAMES.CDRS;
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
