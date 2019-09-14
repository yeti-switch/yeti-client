<template>
  <div id="navbar-menu">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
    >
      <b-navbar-brand href="#">
        <img
          alt="Yeti logo"
          src="../assets/logo.png"
        >
      </b-navbar-brand>

      <b-collapse
        id="nav_collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item
            v-if="!isAuthenticated"
            router-link
            to="/login"
          >
            Sign in
          </b-nav-item>
          <b-nav-item
            v-if="isAuthenticated"
            router-link
            to="/"
          >
            Home
          </b-nav-item>
          <b-nav-item
            v-if="isAuthenticated"
            router-link
            to="/rates"
          >
            Rates
          </b-nav-item>
          <b-nav-item
            v-if="isAuthenticated"
            router-link
            to="/cdrs"
          >
            Cdrs
          </b-nav-item>
          <b-nav-item
            v-if="isAuthenticated"
            router-link
            to="/accounts"
          >
            Accounts
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav
          v-if="isAuthenticated"
          class="ml-auto"
        >
          <b-nav-item
            @click="logout"
            href="#"
          >
            Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-breadcrumb :items="[this.$route.path]" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavBar',
  data () {
    return ({})
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },

  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => this.$router.push('/login'))
    }
  }
}
</script>