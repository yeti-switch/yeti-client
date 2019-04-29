<template>
  <div id="cdrs">
    <CdrFilter v-on:applyFilter="getCdrs"/>
    <div class="cdrTable">
      <b-spinner variant="primary" label="Spinning" v-if="loading"/>
      <b-table hover v-if="cdrs" class="cdrsTable"
        :small="small"
        :items="cdrs"
        :per-page="perPage"
        :current-page="currentPage"
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
        />
      <p class="mt-3">Total: {{ rows }}</p>
    </div>
  </div>
</template>

<script>
import formatDate from '../utils/date'
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
        timeStart: {
          label: 'Start Time',
          sortable: true,
        },
        timeConnect: {
          label: 'Connect Time',
          sortable: true
        },
        timeEnd: {
          label: 'End Time',
          sortable: true
        },
        duration: {
          label: 'Duration',
          sortable: true
        },
        success: {
          label: 'Success',
          sortable: true
        },
        destinationInitialInterval: {
          label: 'Destination Initial Interval',
          sortable: true
        },
        destinationInitialRate: {
          label: 'Destination Initial Rate',
          sortable: true
        },
        destinationNextInterval: {
          label: 'Destination Next Initial',
          sortable: true
        },
        destinationNextRate:{
          label: 'Destination Next Rate',
          sortable: true
        },
        destinationFee:{
          label: 'Destination Fee',
          sortable: true
        },
        customerPrice: {
          label: 'Customer Price',
          sortable: true
        },
        srcNameIn:{
          label: 'Src Name In',
          sortable: true
        },
        srcPrefixIn: {
          label: 'Src Prefix In',
          sortable: true
        },
        fromDomain: {
          label: 'From Domain',
          sortable: true
        },
        dstPrefixIn: {
          label: 'Dst Prefix In',
          sortable: true
        },
        toDomain: {
          label: 'To Domain',
          sortable: true
        },
        ruriDomain: {
          label: 'R-URI Domain',
          sortable: true
        },
        diversionIn: {
          label: 'Diversion In',
          sortable: true
        },
        localTag: {
          label: 'Local Tag',
          sortable: true
        },
        legaDisconnectCode: {
          label: 'Leg A Disconnect Code',
          sortable: true
        },
        legaDisconnectReason: {
          label: 'Leg A Disconnect Reason',
          sortable: true
        },
        legaRxPayloads: {
          label: 'Leg A Rx Payloads',
          sortable: true
        },
        legaTxPayloads: {
          label: 'Leg A Tx Payloads',
          sortable: true
        },
        authOrigTransportProtocolId: {
          label: 'Auth Origin Transport Protocol Id',
          sortable: true
        },
        authOrigIp: {
          label: 'Auth Origin Ip',
          sortable: true
        },
        authOrigPort: {
          label: 'Auth Origin Port',
          sortable: true
        },
        legaRxBytes: {
          label: 'Leg A Rx Bytes',
          sortable: true
        },
        legaTxBytes: {
          label: 'Leg A Tx Bytes',
          sortable: true
        },
        legaRxDecodeErrs: {
          label: 'Leg A Rx Decode Errors',
          sortable: true
        },
        legaRxNoBufErrs: {
          label: 'Leg A Rx No Buf Errors',
          sortable: true
        },
        legaRxParseErrs: {
          label: 'Leg A Rx Parse Errors',
          sortable: true
        },
        srcPrefixRouting: {
          label: 'Src Prefix Routing',
          sortable: true
        },
        dstPrefixRouting: {
          label: 'Dst Prefix Routing',
          sortable: true
        },
        destinationPrefix: {
          label: 'Destination Prefix',
          sortable: true
        }
      }
    }
  },
  computed: {
    cdrs: function () {
      const cdrs = this.$store.state.cdrs.cdrs.data
      if (cdrs) {
        const items = cdrs.map(item => {
          item.timeStart = formatDate(item.timeStart)
          item.timeConnect = formatDate(item.timeConnect)
          item.timeEnd = formatDate(item.timeEnd)
          return item
        })
        return items || []
      }
      return []
    },
    loading: function () {
      return this.$store.state.cdrs.requestPending
    },
    rows: function () {
      if (this.$store.state.cdrs.cdrs.data) {
        return this.$store.state.cdrs.cdrs.data.length
      }
      return 0
    }
  },
  methods: {
    getCdrs: function (filter) {
      this.$store.dispatch('getCdrs', filter)
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
  #cdrs {
    font-size: 12px;
  }
  table {
    white-space:nowrap;
  }

  .cdrTable {
    margin-inline-start: 250pt;
  }

</style>
