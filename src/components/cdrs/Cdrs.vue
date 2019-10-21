<template>
  <DataTable
    :fields="fields"
    :items="cdrs"
    :rows="rows"
    :badged-item="badgedItem"
    :get-data="getCdrs"
  >
    <template v-slot:filter>
      <!-- <CdrFilter v-on:applyFilter="getCdrs" /> -->
    </template>
    <template v-slot:quickFilter>
      <div class="quickfilter">
        <div>
          <b-link>Apply custom filters</b-link>, or
        </div>
        <div class="quickfilter-wrapper">
          <span>use quick filter by Start Time:&nbsp;</span>
          <date-range-picker
            ref="picker"
            v-model="dateRange"
            :opens="opens"
            :locale-data="localeData"
            :time-picker="timePicker"
            :linked-calendars="linkedCalendars"
            @update="updateValues"
          >
            >
            <div
              slot="input"
              slot-scope="picker"
              style="min-width: 250px;"
            >
              {{ picker.startDate | date }} - {{ picker.endDate | date }}
            </div>
          </date-range-picker>
          <b-button
            type="reset"
            variant="light"
            size="sm"
            class="ml-2"
            @click="onResetClick"
          >
            Reset
          </b-button>
        </div>
      </div>
    </template>
  </DataTable>
</template>

<script>
import { isEmpty } from 'lodash';
import DateRangePicker from 'vue2-daterange-picker';

import utils from '../../utils';
import DataTable from '../DataTable/DataTable';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: 'Cdrs',
  components: {
    // CdrFilter,
    DataTable,
    DateRangePicker,
  },
  filters: {
    date(dateStr) {
      return utils.formatPickerDate(dateStr);
    },
  },
  data() {
    return {
      badgedItem: 'success',
      // Picker stuff
      opens: 'right',
      timePicker: true,
      dateRange: utils.getLast24Hours(),
      linkedCalendars: false,
      localeData: {
        firstDay: 1,
        format: 'DD-MM-YYYY HH:mm:ss',
        applyLabel: 'Filter',
      },
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
      return this.$store.getters.cdrs;
    },
    filterValue() {
      return {
        timeStartGteq: this.$data.dateRange.startDate,
        timeStartLteq: this.$data.dateRange.endDate,
      };
    },
    loading() {
      return this.$store.getters.isRequestPending;
    },
    rows() {
      if (this.$store.getters.cdrs && this.$store.getters.cdrs.meta) {
        return this.$store.getters.cdrs.meta['total-count'];
      }

      return 0;
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
    updateValues() {
      this.$store.dispatch('setCdrFilter', this.filterValue);
      this.getCdrs();
    },
    onResetClick() {
      this.$data.dateRange = utils.getLast24Hours();
      this.resetCdrFilter();
      this.getCdrs();
    },
    resetCdrFilter() {
      this.$store.dispatch('setCdrFilter', this.filterValue);
    },
  },
};
</script>

<style>
.quickfilter {
  text-align: left;
  padding: 0 0 10px 15px;
}
.quickfilter .form-control {
  font-size: 0.9rem;
  text-align: center;
}
</style>
