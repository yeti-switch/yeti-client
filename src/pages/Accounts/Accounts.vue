<template>
  <div class="accounts-page">
    <vertical-list-ant :data-source="account" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { COMMON_TABLE_ENTITY_EXCLUDED_FIELDS, ACCOUNTS } from '@/constants';
import utils from '@/utils';
import VerticalListAnt from '@/components/VerticalListAnt/VerticalListAnt';

export default {
  name: 'Account',
  components: {
    VerticalListAnt,
  },
  computed: {
    ...mapGetters(['activeAccount', 'currentAccountDetails']),
    account() {
      return utils.formatAccount(
        COMMON_TABLE_ENTITY_EXCLUDED_FIELDS, this.currentAccountDetails,
      );
    },
  },
  watch: {
    activeAccount() {
      this[ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS]();
    },
  },
  created() {
    if (this.activeAccount) {
      this[ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS]();
    }
  },
  methods: {
    ...mapActions([ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS]),
  },
};
</script>
