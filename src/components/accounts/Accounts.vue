<template>
  <div>
    <h3 class="text-left pl-5">
      Accounts
    </h3>
    <DataTable
      :fields="fields"
      :items="accounts"
      :rows="rows"
      :get-data="getAccounts"
    >
      <template v-slot:filter>
        <!-- <AccountsFilter v-on:applyFilter="getAccounts" /> -->
      </template>
    </DataTable>
  </div>
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
      return this.$store.getters.accounts.items;
    },
    rows() {
      return this.$store.getters.accounts && this.$store.getters.accounts.meta
        ? this.$store.getters.accounts.meta['total-count'] : 0;
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
