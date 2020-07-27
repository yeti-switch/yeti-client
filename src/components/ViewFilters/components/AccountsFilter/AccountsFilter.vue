<template>
  <div>
    Account:
    <b-dropdown
      v-if="activeAccount"
      :text="activeAccount.name"
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
import { mapGetters, mapActions } from 'vuex';

import { ACCOUNTS } from '@/constants';

export default {
  computed: {
    ...mapGetters(['activeAccount', 'accounts']),
  },
  created() {
    this[ACCOUNTS.ACTIONS.GET_ACCOUNTS]();
  },
  methods: {
    ...mapActions([ACCOUNTS.ACTIONS.GET_ACCOUNTS, ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID]),
    optionClick(id) {
      if (this.activeAccount.id !== id) {
        this[ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID](id);
      }
    },
  },
};
</script>
