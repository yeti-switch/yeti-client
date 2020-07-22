<template>
  <div class="accounts-page">
    <b-table
      stacked
      :items="account"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { COMMON_TABLE_ENTITY_EXCLUDED_FIELDS, ACCOUNTS } from '@/constants';
import utils from '@/utils';

export default {
  name: 'Account',
  computed: {
    ...mapGetters(['activeAccount']),
    account() {
      return utils.formatAccount(
        this.$store.getters.currentAccountDetails, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS,
      );
    },
  },
  watch: {
    activeAccount() {
      this.$store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS);
    },
  },
  created() {
    if (this.activeAccount) {
      this.$store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS);
    }
  },
};
</script>

<style lang="scss">
.accounts-page {
  // Following rules are so big, so they will be able to overwrite library styles
  .table.b-table.b-table-stacked {
    & > tbody {
      & > tr {
        & > [data-label] {
          text-align: left;

          &::before {
            text-align: left;
            width: 20%;
          }
        }

      }
    }
  }
}
</style>
