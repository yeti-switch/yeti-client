<template>
<div id="navbar-menu">
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#"><img alt="Yeti logo" src="../assets/logo.png"></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item router-link to="/login" v-if="!isAuthenticated" >Sign in</b-nav-item>
        <b-nav-item router-link to="/" v-if="isAuthenticated" >Home</b-nav-item>
        <b-nav-item router-link to="/rates" v-if="isAuthenticated" >Rates</b-nav-item>
        <b-nav-item router-link to="/cdrs" v-if="isAuthenticated" >Cdrs</b-nav-item>
        <b-nav-item router-link to="/accounts" v-if="isAuthenticated" >Accounts</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="isAuthenticated">
        <b-nav-item href="#" @click="logout" >Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <b-breadcrumb :items="[this.$route.path]"></b-breadcrumb>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'NavBar',
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