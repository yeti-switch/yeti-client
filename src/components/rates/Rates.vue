<template>
  <div id="rates">
    <RatesFilter v-on:applyFilter="getRates"/>
    <div class="ratesTable contentTable">
      <b-spinner variant="primary" label="Spinning" v-if="loading"/>
      <b-table hover  v-if="rates"
        :small="small"
        :items="rates"
        :per-page="perPage"
        :current-page="currentPage"
        :striped="striped"
        :fixed="fixed"
        :fields="fields">

        <template slot="rejectCalls" slot-scope="row">
          <b-badge pill v-bind:variant="row.item.rejectCalls ? 'success' : 'danger'">{{row.item.rejectCalls}}</b-badge>
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        size="sm"
        aria-controls="ratesTable"
        />
      <p class="mt-3">Total: {{ rows }}</p>
    </div>
  </div>
</template>

<script>
import formatDate from '../../utils/date'
import RatesFilter from './RatesFilter'

export default {
  name: 'rates',
  data () {
    return {
      small: true,
      striped: true,
      fixed: false,
      perPage: 50,
      currentPage: 1,
      fields: {
        'connect-fee': {
          label: 'Connect fee'
        },
        'initial-interval': {
          label: 'Initial interval'
        },
        'initial-rate': {
          label: 'Initial rate'
        },
        'network-prefix': {
          label: 'Network prefix'
        },
        'next-interval': {
          label: 'Next interval'
        },
        'next-rate': {
          label: 'Next rate'
        },
        'prefix': {
          label: 'Prefix'
        },
        'reject-calls': {
          label: 'Reject calls'
        },
        'valid-from': {
          label: 'Valid from'
        },
        'valid-till': {
          label: 'Valid till'
        }
      }
    }
  },
  computed: {
    rates: function () {
      const rates = this.$store.state.rates.rates.data
      if(rates) {
        const items = rates.map(item => {
          item['valid-from'] = formatDate(item['valid-from'])
          item['valid-till'] = formatDate(item['valid-till'])
          return item
        })
        return items || []
      }
      return []
    },
    loading: function () {
      return this.$store.state.rates.requestPending
    },
    rows: function () {
      return this.rates ? this.rates.length : 0; // TODO: move somewhere
    }
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
  },
  created: function () {
    this.getRates()
  },
  components: {
    RatesFilter
  }
}
</script>

<style>
</style>
