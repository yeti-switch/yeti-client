<template>
<div id="rates">
  <h1>Rates page</h1>
  <ul>
    <li> Rate 1</li>
    <li> Rate 2</li> 
    <li> Rate 3</li>
  </ul>
  <button @click="getRates">Get rates</button>
</div>
</template>

<script>
export default {
  name: 'rates',
  data () {
    return {
      rates: [
        {id:'1', data:'rate1'},
        {id:'2', data:'rate2'},
        {id:'3', data:'rate3'},
      ]
    }
  },
  methods: {
    getRates: function () {
      this.$store.dispatch('getRates', localStorage.getItem('yeti-token'))
      console.log(`Rates request`);
    }
  }
}
</script>