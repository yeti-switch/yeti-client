<template>
<div id="app">
  <NavBar/>
  <main>
    <router-view/>
  </main>
</div>
</template>

<script>
  import NavBar from './components/NavBar'
  import Errors from './components/Errors'
  export default {
    name: 'app',
    components: {
      NavBar,
      Errors
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
