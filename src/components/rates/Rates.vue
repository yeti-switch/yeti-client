<template>
  <DataTable
    :fields="fields"
    :items="rates"
    :rows="rows"
    :badgedItem="badgedItem"
    :getData="getRates"
  >
    <template v-slot:filter>
      <!-- <RatesFilter v-on:applyFilter="getRates" /> -->
    </template>
  </DataTable>
</template>

<script>
import formatDate from '../../utils/date'
import RatesFilter from './RatesFilter'
import DataTable from '../DataTable/DataTable'

export default {
  name: 'Rates',
  components: {
    // RatesFilter,
    DataTable
  },
  data () {
    return {
      badgedItem: 'rejectCalls',
      fields: [
        {
          key:'connect-fee',
          label: 'Connect fee'
        },
        {
          key:'initial-interval',
          label: 'Initial interval'
        },
        {
          key:'initial-rate',
          label: 'Initial rate'
        },
        {
          key:'network-prefix',
          label: 'Network prefix'
        },
        {
          key:'next-interval',
          label: 'Next interval'
        },
        {
          key:'next-rate',
          label: 'Next rate'
        },
        {
          key:'prefix',
          label: 'Prefix'
        },
        {
          key:'reject-calls',
          label: 'Reject calls'
        },
        {
          key:'valid-from',
          label: 'Valid from'
        },
        {
          key:'valid-till',
          label: 'Valid till'
        }
      ]
    }
  },
  computed: {
    rates: function () {
      const rates = this.$store.state.rates.rates.data
      if (rates) {
        const items = rates.map(item => {
          item['valid-from'] = formatDate(item['valid-from'])
          item['valid-till'] = formatDate(item['valid-till'])
          return item
        })
        return items || []
      }
      return []
    },
    rows: function () {
      return this.rates ? this.rates.length : 0 // TODO: move somewhere
    }
  },
  created: function () {
    this.getRates()
  },
  methods: {
    getRates: function (pageNumber) {
      this.$store.dispatch('getRates', pageNumber)
        .catch(err => {
          console.log(err)
          this.$notify({
            type: 'error',
            title: err[0].title,
            text: err[0].detail
          })
        })
    }
  }
}
</script>

<style>
</style>
