<template>
  <div id="navbar-menu">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
    >
      <b-navbar-brand href="/">
        <img
          alt="Yeti logo"
          src="../../assets/logo.png"
        >
      </b-navbar-brand>

      <b-collapse
        id="nav_collapse"
        is-nav
      >
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            v-if="!isAuthenticated"
            router-link
            to="/login"
          >
            Sign in
          </b-nav-item>
          <b-nav-item
            v-if="isAuthenticated"
            href="#"
            @click="logout"
          >
            Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { AUTH } from '../../constants';

export default {
  name: 'TopBar',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH.ACTIONS.LOGOUT).then(() => this.$router.push('/login'));
    },
  },
};
</script>
