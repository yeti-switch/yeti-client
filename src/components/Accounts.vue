<template>
<div id="accounts">
  <h3>Accounts</h3>
  <Errors/>
  <b-spinner variant="primary" label="Spinning" v-if="loading"/>
  <b-table hover :small="small" :items="accounts" v-if="accounts"/>
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
    }
  },
  created: function () {
    this.getAccounts()
  }
}
</script>
