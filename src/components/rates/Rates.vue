<template>
  <DataTable
    :fields="fields"
    :items="rates"
    :rows="rows"
    :badged-item="badgedItem"
    :get-data="getRates"
  >
    <template v-slot:filter>
      <!-- <RatesFilter v-on:applyFilter="getRates" /> -->
    </template>
  </DataTable>
</template>

<script>
// import RatesFilter from './RatesFilter';
import DataTable from '../DataTable/DataTable';

export default {
  name: 'Rates',
  components: {
    // RatesFilter,
    DataTable,
  },
  data() {
    return {
      badgedItem: 'rejectCalls',
      fields: [
        {
          key: 'connect-fee',
          label: 'Connect fee',
        },
        {
          key: 'initial-interval',
          label: 'Initial interval',
        },
        {
          key: 'initial-rate',
          label: 'Initial rate',
        },
        {
          key: 'network-prefix',
          label: 'Network prefix',
        },
        {
          key: 'next-interval',
          label: 'Next interval',
        },
        {
          key: 'next-rate',
          label: 'Next rate',
        },
        {
          key: 'prefix',
          label: 'Prefix',
        },
        {
          key: 'reject-calls',
          label: 'Reject calls',
        },
        {
          key: 'valid-from',
          label: 'Valid from',
        },
        {
          key: 'valid-till',
          label: 'Valid till',
        },
      ],
    };
  },
  computed: {
    rates() {
      return this.$store.getters.rates;
    },
    rows() {
      return this.rates ? this.rates.length : 0; // TODO: move somewhere
    },
  },
  created() {
    this.getRates();
  },
  methods: {
    getRates(pageNumber) {
      this.$store.dispatch('getRates', pageNumber);
    },
  },
};
</script>

<style>
</style>
