<template>
  <div id="app">
    <NavBar />
    <notifications />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'App',
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 00px;
}

.filter {
  background-color: #f2f2f2;
  border: 1px solid black;
  font-size: 12px;
  margin-left: 10px;
  padding: 10px;
  overflow: hidden;
  width: 320px;
  float: left;
  text-align: left;
}

.contentTable {
  font-size: 12px;
  white-space: nowrap;
  margin-inline-start: 340px;
}
</style>
