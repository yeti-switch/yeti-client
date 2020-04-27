<template>
  <div>
    Account:
    <b-dropdown
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
import { ACCOUNTS } from '@/constants';

export default {
  computed: {
    accounts() {
      return this.$store.getters.accounts.items;
    },
    activeAccountName() {
      return this.$store.getters.activeAccount
        ? this.$store.getters.activeAccount.name
        : '';
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
      this.$store.dispatch(ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID, id);
    },
  },
};
</script>

<style lang="scss"></style>
