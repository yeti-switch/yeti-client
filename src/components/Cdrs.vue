<template>
  <div id="cdrs">
    <h3>CDR</h3>
    <b-spinner variant="primary" label="Spinning" v-if="loading"/>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      size="sm"
      aria-controls="cdrsTable"
      />
    <b-table hover v-if="cdrs" class="cdrsTable"
      :small="small"
      :items="cdrs"
      :per-page="perPage"
      :current-page="currentPage"
      :striped="striped"
      :fixed="fixed"
      :fields="fields"
      />
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      size="sm"
      aria-controls="cdrsTable"
      />
    <p class="mt-3">Total: {{ rows }}</p>
  </div>
</template>

<script>
export default {
  name: 'cdrs',
  data () {
    return {
      small: true,
      striped: true,
      fixed: false,
      perPage: 10,
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
          label: 'Legal Disconnect Code',
          sortable: true
        },
        legaDisconnectReason: {
          label: 'Legal Disconnect Reason',
          sortable: true
        },
        legaRxPayloads: {
          label: 'Legal Rx Payloads',
          sortable: true
        },
        legaTxPayloads: {
          label: 'Legal Tx Payloads',
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
          label: 'Legal Rx Bytes',
          sortable: true
        },
        legaTxBytes: {
          label: 'Legal Tx Bytes',
          sortable: true
        },
        legaRxDecodeErrs: {
          label: 'Legal Rx Decode Errors',
          sortable: true
        },
        legaRxNoBufErrs: {
          label: 'Legal Rx No Buf Errors',
          sortable: true
        },
        legaRxParseErrs: {
          label: 'Legal Rx Parse Errors',
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
          item.timeStart = this.formatDate(item.timeStart)
          item.timeConnect = this.formatDate(item.timeConnect)
          item.timeEnd = this.formatDate(item.timeEnd)
          return item
        })
        return items || []
      }
    },
    loading: function () {
      return this.$store.state.cdrs.requestPending
    },
    rows: function () {
      if (this.$store.state.cdrs.cdrs.data) {
        return this.$store.state.cdrs.cdrs.data.length
      }
    }
  },
  methods: {
    getCdrs: function () {
      this.$store.dispatch('getCdrs')
        .catch(err => {
          this.$notify({
            type: 'error',
            title: err[0].title,
            text: err[0].detail
          })
        })
    },
    formatDate: function(dateStr) {
      if(dateStr) {
        const formattedDate = new Date(Date.parse(dateStr))
        const addZero = number => number < 10 ? '0'+number : number
    
        return `${formattedDate.getFullYear()}/${formattedDate.getMonth()}/${formattedDate.getDate()} ${addZero(formattedDate.getHours())}:${addZero(formattedDate.getMinutes())}:${addZero(formattedDate.getSeconds())}`
      }
      return ''
    },
  },
  created: function () {
    this.getCdrs()
  }
}
</script>

<style>
  table {
    white-space:nowrap;
  }
</style>
