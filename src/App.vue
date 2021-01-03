<template>
  <div id="app">
    <notifications />
    <main>
      <NavBar />
      <div class="working-area-wrapper">
        <router-view :name="loginRouteName" />
        <router-view :name="filtersRouteName" />
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from './components/NavBar/NavBar';
import {
  AUTH, NOTIFICATION_TYPES, GENERAL_ROUTE_NAMES,
} from './constants';
import api from './api';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      type: NOTIFICATION_TYPES.ERROR,
      loginRouteName: GENERAL_ROUTE_NAMES.LOG_IN,
      filtersRouteName: GENERAL_ROUTE_NAMES.VIEW_FILTERS,
    };
  },
  computed: {
    ...mapGetters(['locale']),
  },
  beforeCreate() {
    api.apiInstance.insertNetworkErrorMiddleware(this.$notify, this.$store.dispatch);
    api.apiInstance.insertNetworkAuthErrorMiddleware(this.$router.push, this.$store.dispatch);
    this.$store.dispatch(AUTH.ACTIONS.LOCAL_AUTH);
  },
  created() {
    this.$i18n.locale = this.locale;
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
  /* min-height: 900px; */
}

.working-area-wrapper {
  flex: 1 1 auto;
  width: calc(100vw - 230px);
  padding: 10px 10px 0;
  background-color: #ecf0f5;
  overflow: auto;
}
</style>
