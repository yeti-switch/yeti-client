<template>
  <DataTable
    :fields="fields"
    :items="rates"
    :rows="rows"
    :get-data="getRates"
    :items-to-badge="itemsToBadge"
  />
</template>

<script>
import { flow, get } from 'lodash';

import utils from '@/utils';
import { RATES } from '@/constants';
import DataTable from '@/components/DataTable/DataTable';

import { TABLE_HEADERS } from './constants';

export default {
  name: 'Rates',
  components: {
    DataTable,
  },
  data() {
    return {
      fields: TABLE_HEADERS,
      itemsToBadge: [{
        id: 'reject-calls',
        errorValue: false,
      }],
    };
  },
  computed: {
    rates() {
      return flow(utils.formatRates)(this.$store.getters.rates.items);
    },
    rows() {
      return get(this.$store.getters, ['rates', 'meta', 'total-count'], 0);
    },
  },
  created() {
    this.getRates();
  },
  methods: {
    getRates(pageNumber) {
      this.$store.dispatch(RATES.ACTIONS.GET_RATES, pageNumber);
    },
  },
};
</script>

<style>
</style>
