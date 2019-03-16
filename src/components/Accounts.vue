<template>
<div id="accounts">
  <h1>Accounts page</h1>
  <ul>
    <li v-for="account in accounts.data" v-bind:key="account.id" >{{account}}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'accounts',
  data () {
    return  {
    }
  },
  computed: {
    accounts: function () {
      return this.$store.state.accounts.accounts
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