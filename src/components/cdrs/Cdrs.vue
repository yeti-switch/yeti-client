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
          <div>
            <b-link>Apply custom filters</b-link>, or
            <QuickTableFilter
              :get-data="getCdrs"
              :on-reset="onReset"
              :date-range="dateRange"
            />
          </div>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { isEmpty, flow } from 'lodash';

import utils from '../../utils';
import DataTable from '../DataTable/DataTable';
import QuickTableFilter from '../QuickTableFilter/QuickTableFilter';

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
      fields: [
        {
          key: 'time-start',
          label: 'Start Time',
          sortable: true,
        },
        {
          key: 'time-connect',
          label: 'Connect Time',
        },
        {
          key: 'time-end',
          label: 'End Time',
        },
        {
          key: 'duration',
          label: 'Duration',
        },
        {
          key: 'success',
          label: 'Success',
        },
        {
          key: 'destination-initial-interval',
          label: 'Destination Initial Interval',
        },
        {
          key: 'destination-initial-rate',
          label: 'Destination Initial Rate',
        },
        {
          key: 'destination-next-interval',
          label: 'Destination Next Initial',
        },
        {
          key: 'destination-next-rate',
          label: 'Destination Next Rate',
        },
        {
          key: 'destination-fee',
          label: 'Destination Fee',
        },
        {
          key: 'customer-price',
          label: 'Customer Price',
        },
        {
          key: 'src-name-in',
          label: 'Src Name In',
        },
        {
          key: 'src-prefix-in',
          label: 'Src Prefix In',
        },
        {
          key: 'from-domain',
          label: 'From Domain',
        },
        {
          key: 'dst-prefix-in',
          label: 'Dst Prefix In',
        },
        {
          key: 'to-domain',
          label: 'To Domain',
        },
        {
          key: 'ruri-domain',
          label: 'R-URI Domain',
        },
        {
          key: 'diversion-in',
          label: 'Diversion In',
        },
        {
          key: 'local-tag',
          label: 'Local Tag',
        },
        {
          key: 'lega-disconnect-code',
          label: 'Leg A Disconnect Code',
        },
        {
          key: 'lega-disconnect-reason',
          label: 'Leg A Disconnect Reason',
        },
        {
          key: 'lega-rx-payloads',
          label: 'Leg A Rx Payloads',
        },
        {
          key: 'lega-tx-payloads',
          label: 'Leg A Tx Payloads',
        },
        {
          key: 'auth-orig-transport-protocol-id',
          label: 'Auth Origin Transport Protocol Id',
        },
        {
          key: 'auth-orig-ip',
          label: 'Auth Origin Ip',
        },
        {
          key: 'auth-orig-port',
          label: 'Auth Origin Port',
        },
        {
          key: 'lega-rx-bytes',
          label: 'Leg A Rx Bytes',
        },
        {
          key: 'lega-tx-bytes',
          label: 'Leg A Tx Bytes',
        },
        {
          key: 'lega-rx-decode-errs',
          label: 'Leg A Rx Decode Errors',
        },
        {
          key: 'lega-rx-no-buf-errs',
          label: 'Leg A Rx No Buf Errors',
        },
        {
          key: 'lega-rx-parse-errs',
          label: 'Leg A Rx Parse Errors',
        },
        {
          key: 'src-prefix-routing',
          label: 'Src Prefix Routing',
        },
        {
          key: 'dst-prefix-routing',
          label: 'Dst Prefix Routing',
        },
        {
          key: 'destination-prefix',
          label: 'Destination Prefix',
        },
      ],
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
      return this.$store.getters.cdrs && this.$store.getters.cdrs.meta
        ? this.$store.getters.cdrs.meta['total-count'] : 0;
    },
  },
  created() {
    if (isEmpty(this.$store.getters.cdrFilter)) {
      this.$store.dispatch('setCdrFilter', this.filterValue);
    }
    this.getCdrs();
  },
  methods: {
    getCdrs(pageNumber) {
      this.$store.dispatch('getCdrs', pageNumber);
    },
    onReset() {
      this.$data.dateRange = utils.getLast24Hours();
    },
    toggleIfNotLoading() {
      if (this.loading) {
        this.$refs.picker.open = false;
      }
    },
  },
};
</script>

<style>
</style>
