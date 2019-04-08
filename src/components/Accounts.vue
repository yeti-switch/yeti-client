<template>
<div id="accounts">
  <h3>Accounts</h3>
  <b-spinner variant="primary" label="Spinning" v-if="loading"/>
  <b-table hover :small="small" :items="accounts" v-if="accounts"/>
</div>
</template>

<script>
export default {
  name: 'accounts',
  data () {
    return  {
      small: true
    }
  },
  computed: {
    accounts: function () {
      return this.$store.state.accounts.accounts.data  // TODO: move somewhere
    },
    loading: function () {
      return this.$store.state.accounts.requestPending
    }
  },
  methods: {
    getAccounts: function () {
      this.$store.dispatch('getAccounts')
        .catch(err => {
          this.$notify({
            type: 'error',
            title: err[0].title,
            text: err[0].detail
          })
        })
    }
  },
  created: function () {
    this.getAccounts()
  }
}
</script>
