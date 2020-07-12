<template>
  <DataTableAnt
    :fields="fields"
    :items="cdrs"
    :rows="rows"
    :get-data="getCdrs"
    :items-to-badge="itemsToBadge"
  />
</template>

<script>
import { flow, get } from 'lodash';

import utils from '@/utils';
import { CDRS } from '@/constants';

// import DataTable from '@/components/DataTable/DataTable';
import DataTableAnt from '@/components/DataTableAnt/DataTableAnt';
import { TABLE_HEADERS_ANT } from './constants';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: 'Cdrs',
  components: {
    // DataTable,
    DataTableAnt,
  },
  data() {
    return {
      // Table fields
      fields: TABLE_HEADERS_ANT,
      itemsToBadge: [{
        id: 'success',
        errorValue: 'No',
      }],
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
    this.getCdrs();
  },
  methods: {
    getCdrs(pageNumber) {
      this.$store.dispatch(CDRS.ACTIONS.GET_CDRS, pageNumber);
    },
  },
};
</script>

<style>
</style>
