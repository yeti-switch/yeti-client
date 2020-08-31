<template>
  <div class="accounts-page">
    <vertical-list-ant :data-source="account" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { flow } from 'lodash';

import { COMMON_TABLE_ENTITY_EXCLUDED_FIELDS, ACCOUNTS } from '@/constants';
import utils from '@/utils';
import VerticalListAnt from '@/components/VerticalListAnt/VerticalListAnt';

import locale from './locale';

export default {
  name: 'Account',
  i18n: locale,
  components: {
    VerticalListAnt,
  },
  computed: {
    ...mapGetters(['activeAccount', 'currentAccountDetails']),
    account() {
      return flow(
        utils.formatAccount(COMMON_TABLE_ENTITY_EXCLUDED_FIELDS),
        utils.applyLocaleHeaders(locale.messages[this.$i18n.locale].tableMessage),
      )(this.currentAccountDetails);
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
