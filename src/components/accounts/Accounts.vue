<template>
  <DataTable :fields="fields" :items="accounts" :rows="rows" :get-data="getAccounts">
    <template v-slot:filter>
      <!-- <AccountsFilter v-on:applyFilter="getAccounts" /> -->
    </template>
  </DataTable>
</template>

<script>
// import AccountsFilter from './AccountsFilter';
import DataTable from '../DataTable/DataTable';

export default {
  name: 'Accounts',
  components: {
    // AccountsFilter,
    DataTable,
  },
  data() {
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
        'total-capacity',
      ],
    };
  },
  computed: {
    accounts() {
      return this.$store.state.accounts.accounts.data; // TODO: move somewhere
    },
    rows() {
      return this.accounts ? this.accounts.length : 0; // TODO: move somewhere
    },
  },
  created() {
    this.getAccounts();
  },
  methods: {
    getAccounts(pageNumber) {
      this.$store.dispatch('getAccounts', pageNumber).catch((err) => {
        if (err[0]) {
          this.$notify({
            type: 'error',
            title: err[0].title,
            text: err[0].detail,
          });
        }
      });
    },
  },
};
</script>
