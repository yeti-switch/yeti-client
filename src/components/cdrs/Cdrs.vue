<template>
  <div id="cdrs">
    <CdrFilter v-on:applyFilter="getCdrs"/>
    <div class="cdrTable contentTable">
      <b-spinner variant="primary" label="Spinning" v-if="loading"/>
      <b-table hover v-if="cdrs"
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
        timeStart: {
          label: 'Start Time'
        },
        timeConnect: {
          label: 'Connect Time'
        },
        timeEnd: {
          label: 'End Time'
        },
        duration: {
          label: 'Duration'
        },
        success: {
          label: 'Success'
        },
        destinationInitialInterval: {
          label: 'Destination Initial Interval'
        },
        destinationInitialRate: {
          label: 'Destination Initial Rate'
        },
        destinationNextInterval: {
          label: 'Destination Next Initial'
        },
        destinationNextRate:{
          label: 'Destination Next Rate'
        },
        destinationFee:{
          label: 'Destination Fee'
        },
        customerPrice: {
          label: 'Customer Price'
        },
        srcNameIn:{
          label: 'Src Name In'
        },
        srcPrefixIn: {
          label: 'Src Prefix In'
        },
        fromDomain: {
          label: 'From Domain'
        },
        dstPrefixIn: {
          label: 'Dst Prefix In'
        },
        toDomain: {
          label: 'To Domain'
        },
        ruriDomain: {
          label: 'R-URI Domain'
        },
        diversionIn: {
          label: 'Diversion In'
        },
        localTag: {
          label: 'Local Tag'
        },
        legaDisconnectCode: {
          label: 'Leg A Disconnect Code'
        },
        legaDisconnectReason: {
          label: 'Leg A Disconnect Reason'
        },
        legaRxPayloads: {
          label: 'Leg A Rx Payloads'
        },
        legaTxPayloads: {
          label: 'Leg A Tx Payloads'
        },
        authOrigTransportProtocolId: {
          label: 'Auth Origin Transport Protocol Id'
        },
        authOrigIp: {
          label: 'Auth Origin Ip'
        },
        authOrigPort: {
          label: 'Auth Origin Port'
        },
        legaRxBytes: {
          label: 'Leg A Rx Bytes'
        },
        legaTxBytes: {
          label: 'Leg A Tx Bytes'
        },
        legaRxDecodeErrs: {
          label: 'Leg A Rx Decode Errors'
        },
        legaRxNoBufErrs: {
          label: 'Leg A Rx No Buf Errors'
        },
        legaRxParseErrs: {
          label: 'Leg A Rx Parse Errors'
        },
        srcPrefixRouting: {
          label: 'Src Prefix Routing'
        },
        dstPrefixRouting: {
          label: 'Dst Prefix Routing'
        },
        destinationPrefix: {
          label: 'Destination Prefix'
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
      return this.cdrs ? this.cdrs.length : 0; // TODO: move somewhere
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
</style>
