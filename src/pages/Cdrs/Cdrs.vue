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
import { mapGetters } from 'vuex';

import utils from '@/utils';
import { CDRS } from '@/constants';

// import DataTable from '@/components/DataTable/DataTable';
import DataTableAnt from '@/components/DataTableAnt/DataTableAnt';
import { TABLE_HEADERS_ANT } from './constants';

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
    ...mapGetters(['activeAccount']),
    cdrs() {
      return flow(utils.formatCdrs)(this.$store.getters.cdrs.items);
    },
    rows() {
      return get(this.$store.getters, ['cdrs', 'meta', 'total-count'], 0);
    },
  },
  watch: {
    activeAccount() {
      this.getCdrs();
    },
  },
  created() {
    if (this.activeAccount) {
      this.getCdrs();
    }
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
