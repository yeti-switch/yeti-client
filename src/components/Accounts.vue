<template>
<div id="accounts">
  <h1>Accounts page</h1>
  <ul>
    <li v-for="account in accounts" v-bind:key="account.id" >{{account.attributes.name}}</li>
  </ul>
  <button @click="getAccounts">Get Accounts</button>
</div>
</template>

<script>
export default {
  name: 'accounts',
  data () {
    return  {
      accounts: this.$store.state.accounts.accounts.data
    }
  },
  methods: {
    getAccounts: function () {
      this.$store.dispatch('getAccounts')
      console.log(`getAccounts request`)
    }
  }
}
</script>