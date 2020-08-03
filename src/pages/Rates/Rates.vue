<template>
  <DataTableAnt
    :fields="fields"
    :items="formattedRates"
    :get-data="getRates"
  />
</template>

<script>
import { flow, get } from 'lodash';
import { mapGetters, mapActions } from 'vuex';

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
    ...mapGetters(['rates']),
    formattedRates() {
      return flow(utils.formatRates)(this.rates.items);
    },
    rows() {
      return get(this.rates, ['meta', 'total-count'], 0);
    },
  },
  created() {
    this[RATES.ACTIONS.GET_RATES]();
  },
  methods: {
    ...mapActions([RATES.ACTIONS.GET_RATES]),
  },
};
</script>
