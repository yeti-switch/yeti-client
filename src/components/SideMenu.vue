<template>
<div id="side-menu" class="sidebar">
  <b-list-group>
    <b-list-group-item><img alt="Yeti logo" src="../assets/logo.png"></b-list-group-item>
    <b-list-group-item router-link to="/login" v-if="!isAuthenticated">Login</b-list-group-item>
    <b-list-group-item router-link to="/" v-if="isAuthenticated">Home</b-list-group-item>
    <b-list-group-item router-link to="/rates" v-if="isAuthenticated">Rates</b-list-group-item>
    <b-list-group-item router-link to="/cdrs" v-if="isAuthenticated" >Cdrs</b-list-group-item>
    <b-list-group-item router-link to="/accounts" v-if="isAuthenticated">Accounts</b-list-group-item>
    <b-list-group-item href="#" @click="logout" v-if="isAuthenticated">Logout</b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'SideMenu',
    methods: {
      logout: function () {
        this.$store.dispatch('logout').then(() => this.$router.push('/login'));
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
    data () {
      return ({})
    },
  }
</script>
