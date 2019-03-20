<template>
<div id="rates">
  <h3>Rates</h3>
  <b-spinner variant="primary" label="Spinning" v-if="loading"/>
  <b-table hover :items="rates" v-if="rates"/>
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
      const rates = this.$store.state.rates.rates // TODO: move somewhere

      const ratesAttr = []
      if (rates && rates.data) {
        for(let rate of rates.data) {
          ratesAttr.push(rate.attributes)
        }
      }
      return ratesAttr
    },
    loading: function () {
      return this.$store.state.rates.requestPending
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