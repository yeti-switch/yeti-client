<template>
  <DataTable
    :fields="fields"
    :items="cdrs"
    :rows="rows"
    :get-data="getCdrs"
  />
</template>

<script>
import { isEmpty, flow, get } from 'lodash';

import utils from '@/utils';
import { CDRS } from '@/constants';

import DataTable from '../DataTable/DataTable';
import { TABLE_HEADERS } from './constants';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: 'Cdrs',
  components: {
    DataTable,
  },

  data() {
    return {
      // Table fields
      fields: TABLE_HEADERS,
    };
  },
  computed: {
    cdrs() {
      return flow(utils.formatCdrs)(this.$store.getters.cdrs.items);
    },
    rows() {
      return get(this.$store.getters, ['cdrs', 'meta', 'total-count'], 0);
    },
  },
  created() {
    if (isEmpty(this.$store.getters.cdrFilter)) {
      this.$store.dispatch(CDRS.ACTIONS.SET_CDRS_FILTER, this.filterValue);
    }
    this.getCdrs();
  },
  methods: {
    getCdrs(pageNumber) {
      this.$store.dispatch(CDRS.ACTIONS.GET_CDRS, pageNumber);
    },
    onReset() {
      this.$data.dateRange = utils.getLast24Hours();
    },
  },
};
</script>

<style>
</style>
