<template>
<div id="accounts">
  <h3>Accounts</h3>
  <Errors/>
  <b-spinner variant="primary" label="Spinning" v-if="loading"/>
  <b-table hover :items="accounts" v-if="accounts"/>
</div>
</template>

<script>
import Errors from './Errors'

export default {
  name: 'accounts',
  components: {
    Errors
  },
  props: ['id'],
  data () {
    return  {}
  },
  computed: {
    accounts: function () {
      const accounts = this.$store.state.accounts.accounts  // TODO: move somewhere
      const accountsAttr = []
      if (accounts && accounts.data) {
        for(let account of accounts.data) {
          accountsAttr.push(account.attributes)
        }
      }
      return accountsAttr
    },
    loading: function () {
      return this.$store.state.accounts.requestPending
    }
  },
  methods: {
    getAccounts: function () {
      this.$store.dispatch('getAccounts')
    }
  },
  created: function () {
    this.getAccounts()
  }
}
</script>
