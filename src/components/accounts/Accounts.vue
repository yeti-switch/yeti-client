<template>
  <div id="accounts">
    <AccountsFilter v-on:applyFilter="getAccounts" />

    <div class="accountsTable contentTable">
      <b-spinner
        v-if="loading"
        variant="primary"
        label="Spinning"
      />
      <b-table
        v-if="accounts"
        :small="small"
        :items="accounts"
        :per-page="perPage"
        :fixed="fixed"
        :striped="striped"
        :fields="fields"
        hover
      />

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        :disabled="loading"
        size="sm"
        aria-controls="ratesTable"
      />
      <p class="mt-3">
        Total: {{ rows }}
      </p>
    </div>
  </div>
</template>

<script>
import AccountsFilter from './AccountsFilter'

export default {
  name: 'Accounts',
  components: {
    AccountsFilter
  },
  data () {
    return {
      perPage: 50,
      small: true,
      fixed: false,
      striped: true,
      currentPage: 1,
      fields: {
        'type': {

        },
        'name': {

        },
        'balance': {

        },
        'min-balance': {

        },
        'max-balance': {

        },
        'destination-rate-limit': {

        },
        'origination-capacity': {

        },
        'termination-capacity': {

        },
        'total-capacity': {

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
