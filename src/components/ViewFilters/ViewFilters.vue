<template>
  <div class="view-filters">
    <AccountsFilter />
    <TimeRangeFilter />
  </div>
</template>

<script>
import TimeRangeFilter from './components/TimeRangeFilter/TimeRangeFilter';
import AccountsFilter from './components/AccountsFilter/AccountsFilter';

export default {
  components: {
    TimeRangeFilter,
    AccountsFilter,
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
