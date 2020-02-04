<template>
  <div>
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
import { ACCOUNTS, NOTIFICATION_TYPES } from '../../../../constants';


export default {
  computed: {
    accounts() {
      return this.$store.getters.accounts.items;
    },
    activeAccountName() {
      return this.$store.getters.activeAccount ? this.$store.getters.activeAccount.name : '';
    },
  },
  created() {
    this.getAccounts();
  },
  methods: {
    getAccounts() {
      this.$store.dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNTS).catch((err) => {
        if (err[0]) {
          this.$notify({
            type: NOTIFICATION_TYPES.ERROR,
            title: err[0].title,
            text: err[0].detail,
          });
        }
      });
    },
    optionClick(id) {
      this.$store.dispatch(ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID, id);
    },
  },
};
</script>

<style lang="scss">

</style>
