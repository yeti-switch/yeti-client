<template>
  <div id="cdrs">
    <CdrFilter v-on:applyFilter="getCdrs"/>
    <div class="cdrTable contentTable">
      <b-spinner variant="primary" label="Spinning" v-if="loading"/>
      <b-table hover v-if="!loading"
        :small="small"
        :items="cdrs"
        :per-page="perPage"
        :striped="striped"
        :fixed="fixed"
        :fields="fields">

        <template slot="success" slot-scope="row">
          <b-badge pill v-bind:variant="row.item.success ? 'success' : 'danger'">{{row.item.success}}</b-badge>
        </template>

      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        size="sm"
        aria-controls="cdrsTable"
        v-on:change="getCdrs"
        :disabled="loading"
        />
      <p class="mt-3">Total: {{ rows }}</p>
    </div>
  </div>
</template>

<script>
import formatDate from '../../utils/date'
import CdrFilter from './CdrFilter'
export default {
  name: 'cdrs',
  data () {
    return {
      small: true,
      striped: true,
      fixed: false,
      perPage: 50,
      currentPage: 1,
      fields: {
        'time-start': {
          label: 'Start Time'
        },
        'time-connect': {
          label: 'Connect Time'
        },
        'time-end': {
          label: 'End Time'
        },
        'duration': {
          label: 'Duration'
        },
        'success': {
          label: 'Success'
        },
        'destination-initial-interval': {
          label: 'Destination Initial Interval'
        },
        'destination-initial-rate': {
          label: 'Destination Initial Rate'
        },
        'destination-next-interval': {
          label: 'Destination Next Initial'
        },
        'destination-next-rate':{
          label: 'Destination Next Rate'
        },
        'destination-fee':{
          label: 'Destination Fee'
        },
        'customer-price': {
          label: 'Customer Price'
        },
        'src-name-in':{
          label: 'Src Name In'
        },
        'src-prefix-in': {
          label: 'Src Prefix In'
        },
        'from-domain': {
          label: 'From Domain'
        },
        'dst-prefix-in': {
          label: 'Dst Prefix In'
        },
        'to-domain': {
          label: 'To Domain'
        },
        'ruri-domain': {
          label: 'R-URI Domain'
        },
        'diversion-in': {
          label: 'Diversion In'
        },
        'local-tag': {
          label: 'Local Tag'
        },
        'lega-disconnect-code': {
          label: 'Leg A Disconnect Code'
        },
        'lega-disconnect-reason': {
          label: 'Leg A Disconnect Reason'
        },
        'lega-rx-payloads': {
          label: 'Leg A Rx Payloads'
        },
        'lega-tx-payloads': {
          label: 'Leg A Tx Payloads'
        },
        'auth-orig-transport-protocol-id': {
          label: 'Auth Origin Transport Protocol Id'
        },
        'auth-orig-ip': {
          label: 'Auth Origin Ip'
        },
        'auth-orig-port': {
          label: 'Auth Origin Port'
        },
        'lega-rx-bytes': {
          label: 'Leg A Rx Bytes'
        },
        'lega-tx-bytes': {
          label: 'Leg A Tx Bytes'
        },
        'lega-rx-decode-errs': {
          label: 'Leg A Rx Decode Errors'
        },
        'lega-rx-no-buf-errs': {
          label: 'Leg A Rx No Buf Errors'
        },
        'lega-rx-parse-errs': {
          label: 'Leg A Rx Parse Errors'
        },
        'src-prefix-routing': {
          label: 'Src Prefix Routing'
        },
        'dst-prefix-routing': {
          label: 'Dst Prefix Routing'
        },
        'destination-prefix': {
          label: 'Destination Prefix'
        }
      }
    }
  },
  computed: {
    cdrs: function () {
      const cdrs = this.$store.getters.cdrs.data
      if (cdrs) {
        const items = cdrs.map(item => {
          item['time-start'] = formatDate(item['time-start'])
          item['time-connect'] = formatDate(item['time-connect'])
          item['time-end'] = formatDate(item['time-end'])
          return item
        })
        return items || []
      }
      return []
    },
    loading: function () {
      return this.$store.getters.isRequestPending
    },
    rows: function () {
      if(this.$store.getters.cdrs && this.$store.getters.cdrs.meta) {
        const totalCount = this.$store.getters.cdrs.meta['total-count']
        return totalCount
      }
      return 0
    }
  },
  methods: {
    getCdrs: function (pageNumber) {
      this.$store.dispatch('getCdrs', pageNumber)
        .catch(err => {
          this.$notify({
            type: 'error',
            title: err[0].title,
            text: err[0].detail
          })
        })
    }
  },
  created: function () {
    this.getCdrs()
  },
  components: {
    CdrFilter
  },
}
</script>

<style>
</style>
