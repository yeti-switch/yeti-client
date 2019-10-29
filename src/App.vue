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
import NavBar from './components/NavBar';
import { jsonApi } from './api';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      message: '',
      type: 'error',
    };
  },
  beforeCreate() {
    this.$store.dispatch('localAuth');

    const errorMiddleware = {
      name: 'logout-redirect',
      error: (payload) => {
        this.$notify({
          type: 'error',
          title: payload[0].title,
          text: payload[0].detail,
        });

        if (payload[0].title === 'Authorization failed') {
          this.$store.dispatch('logout');
          this.$router.push('/login');
        }

        return payload;
      },
    };

    jsonApi.instance.insertMiddlewareAfter('errors', errorMiddleware);
  },
  methods: {
    setMessage(message) {
      this.message = message;
    },
  },
};
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
</style>
