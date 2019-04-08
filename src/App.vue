<template>
<div id="app">
  <NavBar/>
  <notifications/>
  <main>
    <router-view/>
  </main>
</div>
</template>

<script>
  import NavBar from './components/NavBar'
  export default {
    name: 'app',
    components: {
      NavBar,
    },
    data () {
      return {
        message: '',
        type: 'error'
      }
    },
    methods: {
      setMessage (message) {
        this.message = message
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 00px;
}

</style>
