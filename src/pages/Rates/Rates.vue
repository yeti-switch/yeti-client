<template>
  <DataTableAnt
    :fields="tableFields"
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
  computed: {
    ...mapGetters(['rates']),
    formattedRates() {
      return flow(utils.formatRates)(this.rates.items);
    },
    rows() {
      return get(this.rates, ['meta', 'total-count'], 0);
    },
    tableFields() {
      return TABLE_HEADERS_ANT.map((header) => (
        {
          ...header,
          title: header.title[this.$i18n.locale],
        }
      ));
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
