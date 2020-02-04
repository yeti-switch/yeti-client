<template>
  <div class="view-filters">
    <span>Accounts dropdown</span>
    <TimeRangeFilter />
  </div>
</template>

<script>
import TimeRangeFilter from '../TimeRangeFilter/TimeRangeFilter';

export default {
  components: {
    TimeRangeFilter,
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
