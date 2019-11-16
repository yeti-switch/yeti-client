<template>
  <div id="app">
    <TopBar />
    <notifications />
    <main>
      <NavBar />
      <div class="working-area-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import TopBar from './components/TopBar/TopBar';
import NavBar from './components/NavBar/NavBar';
import { jsonApi } from './api';

export default {
  name: 'App',
  components: {
    TopBar,
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
main {
  height: calc(100vh - 56px);
  display: flex;
}

.working-area-wrapper {
  flex: 1 1 auto;
  width: calc(100vw - 230px);
  padding: 10px;
  background-color: #ecf0f5;
}
</style>
