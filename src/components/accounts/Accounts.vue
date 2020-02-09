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
import { ACCOUNTS, NOTIFICATION_TYPES } from '../../constants';

export default {
  name: 'Account',
  computed: {
    account() {
      const result = Object.entries(
        // Get rid of not needed properties
        omit(this.$store.getters.activeAccount, ['links', 'id']),
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
      this.$store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNT).catch((err) => {
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

<style lang="scss">
.accounts-page {
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
