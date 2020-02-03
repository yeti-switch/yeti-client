<template>
  <DataTable
    :fields="fields"
    :items="cdrs"
    :rows="rows"
    :get-data="getCdrs"
  >
    <template v-slot:filter>
      <!-- <CdrFilter v-on:applyFilter="getCdrs" /> -->
    </template>
    <template v-slot:quickFilter>
      <div class="quickfilter">
        <b-link>Apply custom filters</b-link>, or
        <QuickTableFilter />
      </div>
    </template>
  </DataTable>
</template>

<script>
import { isEmpty, flow, get } from 'lodash';

import utils from '../../utils';
import DataTable from '../DataTable/DataTable';
import QuickTableFilter from '../QuickTableFilter/QuickTableFilter';
import { CDRS, TIME_RANGE_FILTER } from '../../constants';
import { TABLE_HEADERS } from './constants';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: 'Cdrs',
  components: {
    // CdrFilter,
    DataTable,
    QuickTableFilter,
  },

  data() {
    return {
      // Table fields
      fields: TABLE_HEADERS,
      storeSubscriber: undefined,
    };
  },
  computed: {
    cdrs() {
      return flow(utils.formatCdrs, utils.colorCdrsTable)(this.$store.getters.cdrs.items);
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
    this.$data.storeSubscriber = this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case TIME_RANGE_FILTER.MUTATIONS.SET_VALUE:
          this.getCdrs();
          break;
        default:
      }
    });
  },
  beforeDestroy() {
    this.$data.storeSubscriber();
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
