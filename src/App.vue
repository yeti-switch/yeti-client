<template>
  <div id="app">
    <notifications />
    <main>
      <NavBar />
      <div class="working-area-wrapper">
        <router-view :name="loginRouteName" />
        <router-view :name="filtersRouteName" />
        <router-view v-if="accountsAreLoaded" />
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar';
import { AUTH, NOTIFICATION_TYPES, GENERAL_ROUTE_NAMES } from './constants';
import { jsonApi } from './api';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      message: '',
      type: NOTIFICATION_TYPES.ERROR,
      loginRouteName: GENERAL_ROUTE_NAMES.LOG_IN,
      filtersRouteName: GENERAL_ROUTE_NAMES.VIEW_FILTERS,
    };
  },
  computed: {
    accountsAreLoaded() {
      return this.$store.getters.accounts.items.length > 0;
    },
  },
  beforeCreate() {
    this.$store.dispatch(AUTH.ACTIONS.LOCAL_AUTH);

    const errorMiddleware = {
      name: 'logout-redirect',
      error: (payload) => {
        this.$notify({
          type: NOTIFICATION_TYPES.ERROR,
          title: payload[0].title,
          text: payload[0].detail,
        });

        if (payload[0].title === 'Authorization failed') {
          this.$store.dispatch(AUTH.ACTIONS.LOGOUT);
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
  height: 100vh;
  display: flex;
  /* Aligned to the height of charts */
  min-height: 900px;
}

.working-area-wrapper {
  flex: 1 1 auto;
  width: calc(100vw - 230px);
  padding: 10px;
  background-color: #ecf0f5;
  overflow: auto;
}
</style>
