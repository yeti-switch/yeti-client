<template>
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
</template>

<script>
import { get } from 'lodash';
// import AccountsFilter from './AccountsFilter';
import DataTable from '../DataTable/DataTable';
import { ACCOUNTS, NOTIFICATION_TYPES } from '../../constants';
import { TABLE_HEADERS } from './constants';

export default {
  name: 'Accounts',
  components: {
    // AccountsFilter,
    DataTable,
  },
  data() {
    return {
      fields: TABLE_HEADERS,
    };
  },
  computed: {
    accounts() {
      return this.$store.getters.accounts.items;
    },
    rows() {
      return get(this.$store.getters, ['accounts', 'meta', 'total-count'], 0);
    },
  },
  created() {
    this.getAccounts();
  },
  methods: {
    getAccounts(pageNumber) {
      this.$store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNTS, pageNumber).catch((err) => {
        if (err[0]) {
          this.$notify({
            type: NOTIFICATION_TYPES.ERROR,
            title: err[0].title,
            text: err[0].detail,
          });
        }
      });
    },
  },
};
</script>
