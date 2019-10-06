<template>
  <DataTable
    :fields="fields"
    :items="accounts"
    :rows="rows"
    :getData="getAccounts"
  >
    <template v-slot:filter>
      <!-- <AccountsFilter v-on:applyFilter="getAccounts" /> -->
    </template>
  </DataTable>
</template>

<script>
import AccountsFilter from './AccountsFilter'
import DataTable from '../DataTable/DataTable'

export default {
  name: 'Accounts',
  components: {
    // AccountsFilter,
    DataTable
  },
  data () {
    return {
      fields: [
        'type',
        'name',
        'balance',
        'min-balance',
        'max-balance',
        'destination-rate-limit',
        'origination-capacity',
        'termination-capacity',
        'total-capacity'
      ]
    }
  },
  computed: {
    accounts: function () {
      return this.$store.state.accounts.accounts.data  // TODO: move somewhere
    },
    rows: function () {
      return this.accounts ? this.accounts.length : 0 // TODO: move somewhere
    }
  },
  created: function () {
    this.getAccounts()
  },
  methods: {
    getAccounts: function (pageNumber) {
      this.$store.dispatch('getAccounts', pageNumber)
        .catch(err => {
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
