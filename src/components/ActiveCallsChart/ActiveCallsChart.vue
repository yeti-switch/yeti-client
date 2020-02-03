<template>
  <div>
    ActiveCalls
  </div>
</template>

<script>

import { ACTIVE_CALLS } from '../../constants';

export default {
  created() {
    this.getActiveCalls();
  },
  methods: {
    getActiveCalls() {
      this.$store.dispatch(ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS);
    },
  },
};
</script>
