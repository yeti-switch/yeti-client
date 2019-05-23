<template>
  <div id="accounts">
    <AccountsFilter v-on:applyFilter="getAccounts"/>

    <div class="accountsTable contentTable">
      <b-spinner variant="primary" label="Spinning" v-if="loading"/>
      <b-table hover v-if="accounts"
        :small="small" 
        :items="accounts"
        :per-page="perPage"
        :current-page="currentPage"
        :fixed="fixed"
        :striped="striped"
        :fields="fields"
        />
      
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
import AccountsFilter from './AccountsFilter'

export default {
  name: 'accounts',
  data () {
    return  {
      perPage: 50,
      small: true,
      fixed: false,
      striped: true,
      currentPage: 1,
      fields: {
        type: {

        },
        name: {

        },
        balance: {

        },
        minBalance: {

        },
        maxBalance: {

        },
        destinationRateLimit: {

        },
        originationCapacity: {

        },
        terminationCapacity: {

        },
        totalCapacity: {

        }
      }
    }
  },
  computed: {
    accounts: function () {
      return this.$store.state.accounts.accounts.data  // TODO: move somewhere
    },
    loading: function () {
      return this.$store.state.accounts.requestPending
    },
    rows: function () {
      return this.accounts ? this.accounts.length : 0; // TODO: move somewhere
    }
  },
  methods: {
    getAccounts: function () {
      this.$store.dispatch('getAccounts')
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
    this.getAccounts()
  },
  components: {
    AccountsFilter
  }
}
</script>
