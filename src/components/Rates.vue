<template>
<div id="rates">
  <h1>Rates page</h1>
  <ul>
    <li v-for="rate in rates.data" v-bind:key="rate.id" >{{rate}}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'rates',
  data () {
    return {
    }
  },
  computed: {
    rates: function () {
      return this.$store.state.rates.rates
    }
  },
  methods: {
    getRates: function () {
      this.$store.dispatch('getRates')
    }
  },
  created: function () {
    this.getRates()
  }
}
</script>