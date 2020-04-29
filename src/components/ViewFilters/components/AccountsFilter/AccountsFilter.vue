<template>
  <div>
    Account:
    <b-dropdown
      v-if="activeAccount"
      :text="activeAccountName"
      class="m-md-2"
    >
      <b-dropdown-item
        v-for="account in accounts"
        :key="account.id"
        :data-id="account.id"
        @click="optionClick(account.id)"
      >
        {{ account.name }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ACCOUNTS } from '@/constants';

export default {
  computed: {
    ...mapGetters(['activeAccount', 'accounts']),
    activeAccountName() {
      return this.activeAccount.name;
    },
  },
  created() {
    this.getAccounts();
  },
  methods: {
    getAccounts() {
      this.$store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNTS);
    },
    optionClick(id) {
      if (this.$store.getters.activeAccount.id !== id) {
        this.$store.dispatch(ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID, id);
      }
    },
  },
};
</script>
