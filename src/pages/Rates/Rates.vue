<template>
  <DataTableAnt
    :fields="fields"
    :items="rates"
    :get-data="getRates"
  />
</template>

<script>
import { flow, get } from 'lodash';

import utils from '@/utils';
import { RATES } from '@/constants';
import DataTableAnt from '@/components/DataTableAnt/DataTableAnt';

import { TABLE_HEADERS_ANT } from './constants';

export default {
  name: 'Rates',
  components: {
    DataTableAnt,
  },
  data() {
    return {
      fields: TABLE_HEADERS_ANT,
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
