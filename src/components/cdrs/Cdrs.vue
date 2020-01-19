<template>
  <div>
    <h3 class="text-left pl-5">
      CDRs
    </h3>
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
          <QuickTableFilter
            :get-data="getCdrs"
            :on-reset="onReset"
            :date-range="dateRange"
          />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { isEmpty, flow, get } from 'lodash';

import utils from '../../utils';
import DataTable from '../DataTable/DataTable';
import QuickTableFilter from '../QuickTableFilter/QuickTableFilter';
import { CDRS } from '../../constants';
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
      dateRange: utils.getLast24Hours(),
      // Table fields
      fields: TABLE_HEADERS,
    };
  },
  computed: {
    cdrs() {
      return flow(utils.formatCdrs, utils.colorCdrsTable)(this.$store.getters.cdrs.items);
    },
    filterValue() {
      return {
        timeStartGteq: this.$data.dateRange.startDate,
        timeStartLteq: this.$data.dateRange.endDate,
      };
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
