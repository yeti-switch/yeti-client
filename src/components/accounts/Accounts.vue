<template>
  <div class="accounts-page">
    <b-table
      stacked
      :items="account"
    />
  </div>
</template>

<script>
import { omit, lowerCase, capitalize } from 'lodash';

import { ACCOUNTS } from '@/constants';

import { EXLUDED_RESPONSE_FIELDS } from './constants';

export default {
  name: 'Account',
  computed: {
    account() {
      const result = Object.entries(
        // Get rid of not needed properties
        omit(this.$store.getters.currentAccountDetails, EXLUDED_RESPONSE_FIELDS),
      ).reduce((resultObj, [key, value]) => {
        // Make keys more human-readable
        resultObj[capitalize(lowerCase(key))] = value;

        return resultObj;
      }, {});

      return [result];
    },
  },
  created() {
    this.getAccount();
  },
  methods: {
    getAccount() {
      this.$store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS);
    },
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
