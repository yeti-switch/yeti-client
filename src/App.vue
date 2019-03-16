<template>
<div id="app">
  <SideMenu/>
  <main>
    <router-view/>
  </main>
</div>
</template>

<script>
  import SideMenu from './components/SideMenu'
  export default {
    name: 'app',
    components: {
      SideMenu,
    }
  }
</script>

<style>
#app {
  display: flex;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
